import { Component, OnInit } from '@angular/core';
import { empty, fromEvent, interval, merge, Observable } from 'rxjs';
import { mapTo, scan, startWith, switchMap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html'
})
export class CountdownComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const countdown: any = document.getElementById('countdown');
    const message = document.getElementById('message');
    const pauseButton = document.getElementById('pause');
    const startButton = document.getElementById('start');

    // streams
    const counter$ = interval(1000);
    const pauseClick$ = fromEvent(pauseButton, 'click');
    const startClick$ = fromEvent(startButton, 'click');

    const COUNTDOWN_FROM = 10;

    // com o merge poderá ser chamado a mesma observable,
    // hora passando true para usar o interval
    // hora false para nao usar(deixando assim pausado)
    merge(
      startClick$.pipe(mapTo(true)),
      pauseClick$.pipe(mapTo(false))
    )
      .pipe(
        switchMap(shouldStart => {
          return shouldStart ? counter$ : empty();
        }),
        mapTo(-1),
        scan((accumulator, current) => {
          return accumulator + current;
        }, COUNTDOWN_FROM),
        takeWhile(value => value >= 0),
        startWith(COUNTDOWN_FROM)
      )
      .subscribe(value => {
        countdown.innerHTML = value;
        if (!value) {
          message.innerHTML = 'Liftoff!';
        }
      });
  }

}
