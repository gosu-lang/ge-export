package com.gradle.cloudservices.buildscan.export;

import org.reactivestreams.Publisher;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;
import ratpack.stream.TransformablePublisher;

import java.util.ArrayList;
import java.util.List;

final class GroupingPublisher<T> implements TransformablePublisher<List<T>> {

  private final Publisher<T> publisher;
  private final int num;

  GroupingPublisher(Publisher<T> publisher, int num) {
    this.publisher = publisher;
    this.num = num;
  }

  @Override
  public void subscribe(Subscriber<? super List<T>> subscriber) {
    publisher.subscribe(new Subscriber<T>() {

      private Subscription upstream;
      List<T> grouped = new ArrayList<>(num);

      @Override
      public void onSubscribe(Subscription subscription) {
        upstream = subscription;
        subscriber.onSubscribe(new Subscription() {
          @Override
          public void request(long l) {
            if (l == Long.MAX_VALUE) {
              upstream.request(Long.MAX_VALUE);
            } else {
              upstream.request(l * num);
            }
          }

          @Override
          public void cancel() {
            upstream.cancel();
          }
        });
      }

      public void onNext(T t) {
        grouped.add(t);
        if (grouped.size() == num) {
          subscriber.onNext(grouped);
          grouped = new ArrayList<>(num);
        }
      }

      @Override
      public void onError(Throwable throwable) {
        subscriber.onError(throwable);
      }

      @Override
      public void onComplete() {
        if (!grouped.isEmpty()) {
          subscriber.onNext(grouped);
        }
        subscriber.onComplete();
      }

    });
  }

}


