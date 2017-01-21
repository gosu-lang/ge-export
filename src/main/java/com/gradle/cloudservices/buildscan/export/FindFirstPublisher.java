package com.gradle.cloudservices.buildscan.export;

import org.reactivestreams.Publisher;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;
import ratpack.func.Function;
import ratpack.stream.TransformablePublisher;


final class FindFirstPublisher<I, O> implements TransformablePublisher<O> {

  private final Publisher<I> publisher;
  private final Function<? super I, ? extends O> finder;

  FindFirstPublisher(Publisher<I> publisher, Function<? super I, ? extends O> finder) {
    this.publisher = publisher;
    this.finder = finder;
  }

  @Override
  public void subscribe(Subscriber<? super O> subscriber) {
    publisher.subscribe(new Subscriber<I>() {

      Subscription upstream;
      boolean open;

      @Override
      public void onSubscribe(Subscription subscription) {
        upstream = subscription;
        subscriber.onSubscribe(new Subscription() {
          @Override
          public void request(long l) {
            if (upstream != null) {
              if (!open) {
                upstream.request(l);
                if (l == Long.MAX_VALUE) {
                  open = true;
                }
              }

            }
          }

          @Override
          public void cancel() {
            upstream.cancel();
          }
        });
      }

      @Override
      public void onNext(I i) {
        if (upstream == null) {
          return;
        }

        O out;
        try {
          out = finder.apply(i);
        } catch (Exception e) {
          upstream.cancel();
          onError(e);
          return;
        }

        if (out == null) {
          if (!open) {
            upstream.request(1);
          }
        } else {
          upstream.cancel();
          upstream = null;
          subscriber.onNext(out);
          subscriber.onComplete();
        }
      }

      @Override
      public void onError(Throwable throwable) {
        if (upstream != null) {
          subscriber.onError(throwable);
        }
      }

      @Override
      public void onComplete() {
        if (upstream != null) {
          subscriber.onComplete();
        }
      }
    });
  }

}
