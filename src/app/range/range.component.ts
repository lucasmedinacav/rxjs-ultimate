import { range } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html'
})
export class RangeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const observer = {
      next: value => console.log('range', value),
      error: null,
      complete: () => console.log('complete')
    };

    const range$ = range(1, 5).subscribe(observer);
  }

}
