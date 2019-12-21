import { Component, OnInit } from '@angular/core';
import { range, interval, fromEvent } from 'rxjs';
import { pluck, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-take-until',
  templateUrl: './take-until.component.html'
})
export class TakeUntilComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const click$ = fromEvent(document, 'click');

    const finishObservable$ = interval(1000)
      .pipe(
        takeUntil(click$)
      )
      .subscribe({
        next: value => console.log('interval', value),
        complete: () => console.log('complete')
      });
  }
}
