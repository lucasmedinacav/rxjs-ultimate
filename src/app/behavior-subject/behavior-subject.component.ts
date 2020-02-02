import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-behavior-subject',
  templateUrl: './behavior-subject.component.html'
})
export class BehaviorSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const behavior$ = new BehaviorSubject('Hello');

    const sub1 = behavior$.subscribe(console.log);

    behavior$.next('World');

    const sub2 = behavior$.subscribe(console.log);

    behavior$.next('!!!');

    setTimeout(() => {
      const sub3 = behavior$.subscribe(console.log);
    }, 3000);
  }

}
