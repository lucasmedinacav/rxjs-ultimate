import { Component, OnInit } from '@angular/core';
import { reduce, take } from 'rxjs/operators';
import { from, interval } from 'rxjs';

@Component({
  selector: 'app-reduce',
  templateUrl: './reduce.component.html'
})
export class ReduceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //const reduce$ = reduce()
    const numbers = [1, 2, 3, 4, 5];
    //console.log(numbers.reduce(this.reducer));

    const reduce$ = from(numbers)
      .pipe(
        reduce(this.reducer, 0)
      ).subscribe(console.log);

    const reduceWithInterval$ = interval(2000)
      .pipe(
        take(6),
        reduce(this.reducer, 0)
      ).subscribe(console.log);
  }

  private reducer(currentValue, val) {
    console.log({currentValue, val});
    return currentValue = currentValue + val;
  }

}
