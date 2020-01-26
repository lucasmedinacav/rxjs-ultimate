import { Component, OnInit } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { debounceTime, map, mergeAll, mergeMap, pluck, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html'
})
export class MergeMapComponent implements OnInit {

  avatarUrl: string;

  constructor() { }

  ngOnInit() {
    //this.callIntervalEveryClick();
    //this.startIntervalWhenPressedMouseAndStopWhenLeave();
    //this.callRequestWithMergeMap();
    this.callPostWithBodyUsingMergeMap();
  }

  callPostWithBodyUsingMergeMap() {
    const click$ = fromEvent(document, 'click');

    const coordinates$ = click$.pipe(
      map((event: any) => ({
        x: event.clientX,
        y: event.clientY
      }))
    );

    const coordinatesWithSave$ = coordinates$.pipe(
      mergeMap(coords => ajax.post(
        'https://www.mocky.io/v2/5185415ba171ea3a00704eed',
        coords
      )),
      pluck('response')
    );

    coordinatesWithSave$.subscribe(console.log);
  }

  startIntervalWhenPressedMouseAndStopWhenLeave(): void {
    const mouseDown$ = fromEvent(document, 'mousedown');
    const mouseUp$ = fromEvent(document, 'mouseup');
    const interval$ = interval(500);

    mouseDown$.pipe(
      mergeMap(() => interval$.pipe(
        takeUntil(mouseUp$)
      ))
    ).subscribe(console.log);
  }

  callIntervalEveryClick(): void {
    const click$ = fromEvent(document, 'click');
    const interval$ = interval(1000);

    click$.pipe(
      mergeMap(() => interval$)
    ).subscribe(console.log);
  }

  callRequestWithMergeMap(): void {
    const inputText = document.querySelector('#inputText');

    const input$ = fromEvent(inputText, 'keyup')
      .pipe(
        map(event => {
          const value = (event.target as HTMLInputElement).value;
          return ajax.getJSON(
            `https://api.github.com/users/${value}`
          );
        }),
        debounceTime(1000),
        mergeAll(),
        pluck('avatar_url')
      )
      .subscribe((value: string) => this.avatarUrl = value);
  }

}
