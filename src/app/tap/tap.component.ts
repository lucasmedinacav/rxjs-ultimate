import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html'
})
export class TapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const numbers: number[] = [1, 2, 3, 4, 5];

    const debugNumbers$ = from(numbers)
      .pipe(
        tap(value => console.log('valor ANTES da transformação', value)),
        map(value => value * 10),
        tap(value => console.log('valor APÓS a transformação', value))
      ).subscribe();
  }
}
