import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';


@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html'
})
export class ForkJoinComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const numbers$ = of(1, 2, 3);
    const letters$ = of('a', 'b', 'c');

    forkJoin({
      numbers: numbers$,
      letters: letters$
    }).subscribe(console.log);


    const GITHUB_API_BASE = 'https://api.github.com';
    forkJoin({
      user: ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex`),
      repo: ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex/repos`)
    }).subscribe(console.log);
  }

}
