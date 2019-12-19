import { fromEvent } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fromevent',
  templateUrl: './fromevent.component.html'
})
export class FromeventComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const observer = {
      next: value => console.log('target', value),
      error: null,
      complete: () => console.log('complete')
    };

    // fromEvent cria uma observable
    const click$ = fromEvent(document, 'click').subscribe(observer);
    const keyup$ = fromEvent(document, 'keyup').subscribe(observer);

    setTimeout(() => {
      click$.unsubscribe();
    }, 5000);


  }

}
