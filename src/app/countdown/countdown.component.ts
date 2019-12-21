import { Component, OnInit } from '@angular/core';
import { interval, fromEvent, Observable } from 'rxjs';
import { mapTo, scan, filter, takeWhile, tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html'
})
export class CountdownComponent implements OnInit {

  public count: number = 10;
  private reiniciar$: Observable<any>;
  constructor() { }

  ngOnInit() {
    const btnReiniciar = document.querySelector('#btnReiniciar');
    this.reiniciar$ = fromEvent(btnReiniciar, 'click');
    this.iniciarContagem();
  }

  iniciarContagem() {
    const countdown$ = interval(1000)
      .pipe(
        mapTo(-1),
        scan((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, this.count),
        // filter(value => value > 0)
        tap(value => this.count = value),
        takeWhile(value => value > 0),
        takeUntil(this.reiniciar$)
      ).subscribe({
        next: console.log,
        complete: () => {
          this.count = 10;
          console.log('complete');
        }
      });
  }
}
