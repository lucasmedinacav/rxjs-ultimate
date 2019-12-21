import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { distinct, distinctUntilChanged, flatMap, filter } from 'rxjs/operators';
import { deepEqual } from 'assert';

@Component({
  selector: 'app-distinct-until-changed',
  templateUrl: './distinct-until-changed.component.html'
})
export class DistinctUntilChangedComponent implements OnInit {

  numbers = [1, 2, 2, 2, 3, 4, 5, 6, 7, 8, 2, 9];

  teste = []

  constructor() { }

  ngOnInit() {
    const numbers$ = from(this.numbers)
      .pipe(
        filter(value => !this.teste.some(number => number == value)),
        distinctUntilChanged((current, next) => {
          this.teste.push(next);
          return current == next;
        })
      ).subscribe(console.log);
  }

}
