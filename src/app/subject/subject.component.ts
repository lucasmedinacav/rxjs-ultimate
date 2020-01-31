import { Component, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html'
})
export class SubjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const observer = {
      next: val => console.log('next', val),
      error: err => console.log('error', err),
      complete: () => console.log('complete')
    };

    const subject = new Subject();

    const subscription = subject.subscribe(observer);
    const subscriptionTwo = subject.subscribe(observer);

    const interval$ = interval(2000).pipe(
      tap(value => console.log('interval value =>', value))
    );

    interval$.subscribe(subject);
  }

}
