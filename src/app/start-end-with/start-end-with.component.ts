import { of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { startWith, endWith } from 'rxjs/operators';

@Component({
  selector: 'app-start-end-with',
  templateUrl: './start-end-with.component.html'
})
export class StartEndWithComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const middle$ = of(3, 4, 5);

    middle$.pipe(
      startWith(1, 2),
      endWith(6, 7, 8)
    ).subscribe(console.log)
  }

}
