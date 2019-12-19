import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-interval-timer',
  templateUrl: './interval-timer.component.html'
})
export class IntervalTimerComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const intervalVar = 3000;
    const waitForStart = 10000;

    // O interval executará uma ação a cada tempo estipulado no parametro
    const interval$ = interval(intervalVar).subscribe(value => console.log('interval', value));

    // o timer esperará o tempo definido no primeiro parametro e executára uma ação a cada tempo estimulado no segundo parametro
    const timer$ = timer(waitForStart, intervalVar).subscribe(value => console.log('timer', value));
  }

}
