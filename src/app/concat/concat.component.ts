import { Component, OnInit } from '@angular/core';
import { delay, startWith } from 'rxjs/operators';
import { empty, concat } from 'rxjs';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html'
})
export class ConcatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    const delayed$ = empty().pipe(delay(1000));

    delayed$.pipe(() =>
      concat(
        delayed$.pipe(startWith('3...')),
        delayed$.pipe(startWith('2...')),
        delayed$.pipe(startWith('1...')),
        delayed$.pipe(startWith('Go!')),
      ),
      startWith('Get ready!')
    ).subscribe(console.log);
  }

}