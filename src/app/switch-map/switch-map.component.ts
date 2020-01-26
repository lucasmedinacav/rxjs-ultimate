import { fromEvent } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html'
})
export class SwitchMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const BASE_URL = 'https://api.openbrewerydb.org/breweries';

    const inputText = document.querySelector('#inputText');
    const containerDiv = document.querySelector('#container');

    fromEvent(inputText, 'keyup').pipe(
      debounceTime(500),
      pluck('target', 'value'),
      distinctUntilChanged(),
      switchMap(inputValue => {
        return ajax.getJSON(
          `${BASE_URL}?by_name=${inputValue}`
        );
      })
    ).subscribe((response: any) => {
      containerDiv.innerHTML = response.map(
        b => b.name
      ).join('<br>');
    });
  }

}
