import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-distinct-until-changed',
  templateUrl: './distinct-until-changed.component.html'
})
export class DistinctUntilChangedComponent implements OnInit {

  numbers = [1, 2, 2, 2, 3, 4, 5, 6, 7, 8, 2, 9];

  aux = [];

  constructor() { }

  ngOnInit() {
    const numbers$ = from(this.numbers)
      .pipe(
        filter(value => !this.aux.some(number => number === value)),
        distinctUntilChanged((current, next) => {
          this.aux.push(next);
          return current === next;
        })
      ).subscribe(console.log);
  }

}
