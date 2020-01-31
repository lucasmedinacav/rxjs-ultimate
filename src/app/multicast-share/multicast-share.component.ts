import { Component, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { multicast, refCount, tap, map, share } from 'rxjs/operators';

@Component({
  selector: 'app-multicast-share',
  templateUrl: './multicast-share.component.html'
})
export class MulticastShareComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const multicastedInterval$ = interval(2000).pipe(
      tap(() => console.log('disparei')),
      // multicast(() => new Subject())
      // refCount(), // SEM ELE O NEXT NÃO É EXECUTADO E SUBSTITUI O CONNECT
      share() // SUBSTITUI O MULTICAST + REFCOUNT
    );

    // VAI DAR O START PARA INICIAR O STREAM DO SUBJECT
    // MAS PODE SER SIMPLIFICADO SENDO SUBSTITUIDO PELO  multicast(() => new Subject())
    // multicastedInterval$.connect();

    const sub1$ = multicastedInterval$.subscribe(console.log);
    const sub2$ = multicastedInterval$.subscribe(console.log);

    setTimeout(() => {
      sub1$.unsubscribe();
      sub2$.unsubscribe();
    }, 5000);

  }

}
