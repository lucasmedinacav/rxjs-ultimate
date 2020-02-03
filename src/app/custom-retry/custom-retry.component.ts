import { Component, OnInit } from '@angular/core';
import { catchError, mergeMap, retryWhen, mergeMapTo } from 'rxjs/operators';
import { of, throwError, timer, Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-custom-retry',
  templateUrl: './custom-retry.component.html'
})
export class CustomRetryComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // streams
    const click$ = fromEvent(document, 'click');

    const genericRetryStrategy = ({
      retryAttempts = 3,
      scalingDuration = 1000,
      excludedStatusCodes = []
    }: {
      retryAttempts?: number;
      scalingDuration?: number;
      excludedStatusCodes?: number[];
    } = {}) => (obs: Observable<any>) => {
      return obs.pipe(
        retryWhen(attempts => {
          return attempts.pipe(
            mergeMap((error, i) => {
              const attemptNumber = i + 1;
              if (
                attemptNumber > retryAttempts ||
                excludedStatusCodes.find(e => e === error.status)
              ) {
                console.log('Giving up!');
                return throwError(error);
              }
              console.log(
                `Attempt ${attemptNumber}: retrying in ${attemptNumber *
                scalingDuration}ms`
              );
              return timer(attemptNumber * scalingDuration);
            })
          );
        })
      );
    }

    // simulate network request with error
    click$.pipe(
      mergeMapTo(throwError({
        status: 500,
        message: 'Server error'
      }).pipe(
        genericRetryStrategy({
          retryAttempts: 2,
          scalingDuration: 1000
        }),
        // you may want different catching strategy depending on page
        catchError(err => of(err.message))
      ))
    ).subscribe(console.log);
  }

}
