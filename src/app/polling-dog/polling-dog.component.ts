import { fromEvent, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { mergeMapTo, tap, takeUntil, finalize, switchMapTo, pluck, exhaustMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-polling-dog',
  templateUrl: './polling-dog.component.html'
})
export class PollingDogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const startBtn = document.querySelector('#startBtn');
    const stopBtn = document.querySelector('#stopBtn');
    const status = document.querySelector('#status');
    const imgDog = document.querySelector('#imgDog');

    const start$ = fromEvent(startBtn, 'click');
    const stop$ = fromEvent(stopBtn, 'click');

    start$.pipe(
      exhaustMap(() => timer(0, 3000).pipe(
        tap(() => status.innerHTML = 'Active'),
        switchMapTo(ajax.getJSON('https://random.dog/woof.json').pipe(
          pluck('url'),
        )),
        takeUntil(stop$),
        finalize(() => status.innerHTML = 'Stopped')
      ))
    ).subscribe((response: string) => imgDog.setAttribute('src', response));

  }

}
