import { of } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-of',
  templateUrl: './of.component.html'
})
export class OfComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const observer = {
      next: value => console.log('of', value),
      error: null,
      complete: () => console.log('complete')
    };

    const of$ = of(1, 2, 3, 4, 5).subscribe(observer);

  }

}
