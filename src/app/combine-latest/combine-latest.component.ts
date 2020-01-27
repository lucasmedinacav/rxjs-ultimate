import { Component, OnInit } from '@angular/core';
import { fromEvent, combineLatest } from 'rxjs';
import { map, filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html'
})
export class CombineLatestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const first = document.getElementById('first');
    const second = document.getElementById('second');

    // helper
    const keyupAsValue = elem => {
      return fromEvent(elem, 'keyup').pipe(
        map((event: any) => event.target.valueAsNumber)
      );
    };

    combineLatest(
      keyupAsValue(first),
      keyupAsValue(second)
    )
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        filter(([first, second]) => {
          return !isNaN(first) && !isNaN(second);
        }),
        map(([first, second]) => first + second)
      )
      .subscribe(console.log);
  }

}
