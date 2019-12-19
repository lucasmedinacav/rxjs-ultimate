import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const numbers$ = of(1, 2, 3, 4, 5)
      .pipe(
        filter(this.isBiggestThenTwo)
      ).subscribe(console.log);

    const keyEvent$ = fromEvent(document, 'keyup')
      .pipe(
        pluck('code'),
        filter(key => key === 'ArrowUp')
      ).subscribe(console.log);
  }

  private isBiggestThenTwo(number: number) {
    return number > 2;
  }

}
