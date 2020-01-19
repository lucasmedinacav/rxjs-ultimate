import { Component, OnInit } from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-debounce-time',
  templateUrl: './debounce-time.component.html'
})
export class DebounceTimeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const inputText = document.querySelector('#inputText');

    const inputEvent$ = fromEvent(inputText, 'input')
      .pipe(
        debounceTime(1000),
        pluck('target', 'value'),
        distinctUntilChanged()
      ).subscribe(console.log);
  }

}
