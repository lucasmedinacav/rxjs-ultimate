import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    of(1, 2, 3, 4, 5)
      .pipe(
        map(value => value * 10)
      ).subscribe(console.log);

    const keyEvent$ = fromEvent(document, 'keyup');
    const keyCodeMap$ = keyEvent$
      .pipe(
        map((event: KeyboardEvent) => event)
      ).subscribe(value => console.log('map', value));
    const keyCodePluck$ = keyEvent$
      .pipe(
        pluck('srcElement'),
        // pluck('code'),
      ).subscribe(value => console.log('pluck', value));
    const keyCodeMapTo$ = keyEvent$
      .pipe(
        mapTo('Fui acionado')
      ).subscribe(value => console.log('mapTo', value));

    /* const up$ = fromEvent(upButton, 'click');
    const down$ = fromEvent(downButton, 'click');

    up$.pipe(mapTo(1));
    down$.pipe(mapTo(-1)); */
  }

  private executaAlgo(): void {
    console.log('executou');
  }
}
