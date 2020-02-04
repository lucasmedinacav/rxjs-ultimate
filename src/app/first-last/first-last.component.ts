import { Component, OnInit } from '@angular/core';
import { last, first } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-first-last',
  templateUrl: './first-last.component.html'
})
export class FirstLastComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const source = from(['Corinthians', 'Palmeiras', 'São Paulo', 'Santos']);

    const firstValue = source.pipe(first());
    const lastValue = source.pipe(last());

    firstValue.subscribe(val => console.log(`Primeiro Valor: ${val}`));
    lastValue.subscribe(val => console.log(`Último Valor: ${val}`));
  }
}
