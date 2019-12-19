import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { scan, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html'
})
export class ScanComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const user = [
      { name: 'Brian', loggedIn: false, token: null },
      { name: 'Brian', loggedIn: true, token: 'abc' },
      { name: 'Brian', loggedIn: true, token: '123' }
    ];

    const scan$ = from(user)
      .pipe(
        scan((accumulator, currentValue) => {
          return { ...accumulator, ...currentValue };
        }),
        pluck('loggedIn')
      ).subscribe(console.log);
  }
}
