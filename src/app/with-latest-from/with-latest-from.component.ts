import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent, of } from 'rxjs';
import { concatMap, delay, pluck, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-with-latest-from',
  templateUrl: './with-latest-from.component.html'
})
export class WithLatestFromComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // elems
    const radioButtons = document.querySelectorAll('.radio-option');

    const store$ = new BehaviorSubject({
      testId: 'abc123',
      complete: false,
      moreData: {}
    });

    const saveAnswer = (answer, testId) => {
      // simulate delayed request
      return of({
        answer,
        testId
        // TRY TO AVOID THIS
        // testId: store$.value.testId
      }).pipe(delay(200));
    };

    // streams
    const answerChange$ = fromEvent(radioButtons, 'click');

    answerChange$.pipe(
      /*
       * Instead use withLatestFrom to grab extra
       * state that you may need.
       */
      withLatestFrom(store$.pipe(pluck('testId'))),
      concatMap(([event, testId]: any) => {
        return saveAnswer(event.target.value, testId);
      })
    )
      .subscribe(console.log);
  }

}
