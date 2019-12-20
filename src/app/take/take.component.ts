import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html'
})
export class TakeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const keyupEventLimited$ = fromEvent(document, 'keyup')
      .pipe(
        pluck('code'),
        take(2)
      ).subscribe({
        next: console.log,
        complete: () => console.log('completed')
      });
  }
}
