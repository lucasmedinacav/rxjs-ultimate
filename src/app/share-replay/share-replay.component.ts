import { fromEvent } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { mergeMapTo, shareReplay } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-share-replay',
  templateUrl: './share-replay.component.html'
})
export class ShareReplayComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const click$ = fromEvent(document, 'click');

    const clickRequest$ = click$.pipe(
      mergeMapTo(ajax('https://api.github.com/users/octocat')),
      shareReplay()
      // SHARE REPLAY FAZ COM QUE SE ALGUEM SE INSCREVER APOS A PRIMEIRA CHAMADA, NÃO CHAME NOVAMENTE, MAS SÓ OBTENHA O ULTIMO RESULTADO
      // COMO UMA ESPECIE DE CACHE
    );

    clickRequest$.subscribe(console.log);

    setTimeout(() => {
      console.log('se inscrevendo apos 5 segundos');
      clickRequest$.subscribe(console.log);
    }, 5000);
  }

}
