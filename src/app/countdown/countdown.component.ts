import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { mapTo, scan, filter } from 'rxjs/operators';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html'
})
export class CountdownComponent implements OnInit {

  public count: number;

  constructor() { }

  ngOnInit() {
    const countdown$ = interval(1000)
      .pipe(
        mapTo(-1),
        scan((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 10),
        filter(value => value > 0)
      ).subscribe(value => this.count = value);
  }
}
