import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { distinct, skipWhile, filter, delay } from 'rxjs/operators';

@Component({
  selector: 'app-skip-while-distinct',
  templateUrl: './skip-while-distinct.component.html'
})
export class SkipWhileDistinctComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const times$ = of(
      {
        time: 'Palmeiras',
        titulosBrasileiros: 10
      },
      {
        time: 'Santos',
        titulosBrasileiros: 8
      },
      {
        time: 'São Paulo',
        titulosBrasileiros: 6
      },
      {
        time: 'Palmeiras',
        titulosBrasileiros: 10
      },
    );

    times$.pipe(
      filter(time => time.titulosBrasileiros > 8),
      // NÃO FUNCIONA COMO OBJETO INTEIRO, APENAS SELECIONANDO UM ATRIBUTO
      distinct(time => time.time)
    ).subscribe(console.log);

    const numbers$ = from([1, 3, 57, 3, 57, 89]);
    numbers$.pipe(
      delay(1000),
      skipWhile(number => number < 50)
    ).subscribe(val => console.log(val));
  }

}
