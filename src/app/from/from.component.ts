import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html'
})
export class FromComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    const linguagens = ['java', 'dotnet', 'phyton', 'php'];

    // Se utilizar um array no from, ele iterará cada item
    const fromArray$ = from(linguagens).subscribe(value => this.logValue('array', value));

    // Se utilizar uma string no from, ele fará a iteração da cada caracter
    const fromString$ = from('Salve').subscribe(value => this.logValue('string', value));

    // Se utilizar um iterator no from, ele executará um iterator.next() a cada iteração
    const fromIterator$ = from(this.meuIterator()).subscribe(value => this.logValue('iterator', value));

    setTimeout(() => {
      fromArray$.unsubscribe();
      fromIterator$.unsubscribe();
      fromString$.unsubscribe();
    }, 1000);
  }

  logValue(type, value) {
    console.log(type, value);
  }

  meuIterator = function* f() {
    let index = 0;
    while (index < 5) {
      yield index++;
    }
  };
}
