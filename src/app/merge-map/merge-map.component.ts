import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { debounceTime, map, mergeAll, pluck, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html'
})
export class MergeMapComponent implements OnInit {

  avatarUrl: string;

  constructor() { }

  ngOnInit() {

    const inputText = document.querySelector('#inputText');

    const input$ = fromEvent(inputText, 'keyup')
      .pipe(
        map(event => {
          const value = (event.target as HTMLInputElement).value;
          return ajax.getJSON(
            `https://api.github.com/users/${value}`
          );
        }),
        debounceTime(1000),
        mergeAll(),
        pluck('avatar_url')
      )
      .subscribe((value: string) => this.avatarUrl = value);
  }

}
