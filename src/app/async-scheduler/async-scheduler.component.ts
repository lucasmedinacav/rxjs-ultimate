import { Component, OnInit } from '@angular/core';
import { asyncScheduler, of } from 'rxjs';
import { subscribeOn, tap, observeOn } from 'rxjs/operators';

@Component({
  selector: 'app-async-scheduler',
  templateUrl: './async-scheduler.component.html'
})
export class AsyncSchedulerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const observer = {
      next: val => console.log('next', val),
      error: err => console.log('error', err),
      complete: () => console.log('complete')
    };

    /*
     * The asyncScheduler lets you schedule tasks asynchronously,
     * similar to a setTimeout. All schedulers have a signature
     * of work, delay, state, but providing a delay for any other
     * scheduler will simply default it to the asyncScheduler
     * behind the scenes.
     *
     * The schedule call returns a subscription, so if you need
     * to cancel work before it is performed you can simply
     * unsubscribe, similar to observables.
     */
    const sub = asyncScheduler.schedule(
      // work
      console.log,
      // delay
      2000,
      // state
      'Hello World!'
    );

    // sub.unsubscribe();

    /*
     * Most static creation operators accept a scheduler as
     * the last argument. For instance, if we want to emit
     * values from of asynchronously, we can supply the
     * asyncScheduler as the last argument.
     *
     * Output: 4,5,6,1,2,3
     */
    // of(1,2,3, asyncScheduler).subscribe(observer);
    // of(4,5,6).subscribe(observer);

    /*
     * You can also introduce schedulers by using the
     * observeOn operator. This is equivalent to wrapping
     * next, error, and complete functions in appropriate
     * scheduler.
     */
    // of(1,2,3).pipe(
    //   // logging values before scheduler
    //   tap(observer),
    //   // delay can also be supplied as second argument
    //   observeOn(asyncScheduler, 2000)
    // ).subscribe(observer);

    /*
     * Lastly, you can use schedulers to determine when
     * subscriptions occur by using the subscribeOn
     * operator. This is equivalent to wrapping your entire
     * subscription in a scheduler.
     */
    of(1, 2, 3).pipe(
      tap(observer),
      // observeOn(asyncScheduler, 2000),
      subscribeOn(asyncScheduler, 2000)
    ).subscribe(observer);

  }

}
