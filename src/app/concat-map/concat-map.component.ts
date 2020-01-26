import { Component, OnInit } from '@angular/core';
import { concatMap, delay } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html'
})
export class ConcatMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const saveAnswer = answer => {
      // simulate delayed request
      return of(`Saved: ${answer}`).pipe(delay(1500));
    };

    // elems
    const radioButtons = document.querySelectorAll('.radio-option');

    // streams
    const answerChange$ = fromEvent(radioButtons, 'click');

    answerChange$
      .pipe(
        /*
         * concatMap can be useful if you need to queue
         * requests client side. For instance, in this example
         * we are emulating save requests on a quiz, ensuring
         * order remains in tact by not initiating the next 
         * request until the previous completes. Be careful though,
         * as long running inner observables could cause backups.
         */
        concatMap((event: any) => saveAnswer(event.target.value))
      )
      .subscribe(console.log);

  }

}
