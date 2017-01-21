package com.gradle.cloudservices.buildscan.export;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Iterables;
import ratpack.exec.Promise;
import ratpack.exec.util.ParallelBatch;
import ratpack.func.Action;
import ratpack.http.HttpUrlBuilder;
import ratpack.http.client.HttpClient;
import ratpack.http.client.RequestSpec;
import ratpack.sse.ServerSentEventStreamClient;
import ratpack.test.exec.ExecHarness;

import java.io.IOException;
import java.net.URI;
import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;

public class BuildScanExportClient {

  private static final String SERVER = "https://scans.grdev.net";
  private static final int PARALLELISM = 100; // number of build event streams to consume in parallel

  private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
  private static final Action<RequestSpec> GZIP = r -> r.getHeaders().set("Accept-Encoding", "gzip");

  public static void main(String[] args) throws Exception {
    Stats stats = readStats();
    System.out.println(stats.map);
  }

  private static Stats readStats() throws Exception {
    URI base = new URI(SERVER);

    return ExecHarness.yieldSingle(execution -> {
      HttpClient httpClient = HttpClient.of(s -> s.poolSize(PARALLELISM));
      ServerSentEventStreamClient sseClient = ServerSentEventStreamClient.of(httpClient);

      Instant now = Instant.now();
      Instant since = now.minus(Duration.ofDays(7));
      long timestamp = since.toEpochMilli();
      String timestampString = Long.toString(timestamp);

      URI listingUri = HttpUrlBuilder.base(base)
          .path("build-export/v1/builds/since")
          .segment(timestampString)
          .params("stream", "")
          .build();

      Function<String, URI> buildUriFunction = buildId -> HttpUrlBuilder.base(base)
          .path("build-export/v1/build")
          .segment(buildId)
          .segment("events")
          .params("stream", "")
          .build();

      return sseClient.request(listingUri, GZIP)
          .flatMap(buildStream ->
              new GroupingPublisher<>(buildStream, PARALLELISM)
                  .bindExec()
                  .flatMap(builds -> {
                    Iterable<Promise<String>> promises = Iterables.transform(builds, build -> {
                      System.out.println("Parsing build " + build.getId());
                      URI buildEventUri = buildUriFunction.apply(build.getId());
                      return sseClient.request(buildEventUri, GZIP)
                          .flatMap(events ->
                              new FindFirstPublisher<>(events, e -> {
                                if ("BuildAgent_1_0".equals(e.getEvent())) {
                                  JsonNode json = parse(e.getData());
                                  String username = json.get("data").get("username").asText();
                                  return Optional.ofNullable(username).orElse("null");
                                } else {
                                  return null;
                                }
                              }).toPromise()
                          );

                    });
                    return ParallelBatch.of(promises).yield();
                  })
                  .reduce(new Stats(), (s, r) -> {
                    r.forEach(username ->
                        s.map.computeIfAbsent(username, u -> new AtomicInteger()).incrementAndGet()
                    );
                    return s;
                  })
          );
    }).getValueOrThrow();
  }

  private static class Stats {
    ConcurrentMap<String, AtomicInteger> map = new ConcurrentHashMap<>();
  }

  private static JsonNode parse(String json) throws IOException {
    return OBJECT_MAPPER.readTree(json);
  }

}
