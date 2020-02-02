import { ReplaySubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html'
})
export class ReplaySubjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const replay$ = new ReplaySubject();

    replay$.next('Hello');
    replay$.next('World');
    replay$.next('Goodbye');

    replay$.subscribe(console.log);
  }

}
