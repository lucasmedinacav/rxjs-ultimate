import { Component, OnInit } from '@angular/core';
import { AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-async-subject',
  templateUrl: './async-subject.component.html'
})
export class AsyncSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const asyncSubject$ = new AsyncSubject();

    asyncSubject$.subscribe(console.log);
    asyncSubject$.subscribe(console.log);

    asyncSubject$.next('Hello');
    asyncSubject$.next('World');

    asyncSubject$.complete();
  }

}
