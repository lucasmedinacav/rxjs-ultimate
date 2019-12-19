import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'rxjs-ultimate';

  private observer = {
    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: () => console.log('complete!')
  };

  ngOnInit(): void {

    // cria uma nova observable
    // a observable tem 3 propriedades (next, complete, error)
    // next = retorna um dado para quem está inscrito na observable (pode ser chamado quantas vezes forem desejadas)
    // complete = encerra a observable  (é chamado no maximo  uma vez)
    // error = observable se encerra com um erro (é chamado no maximo uma vez)
    const observable = new Observable(subscriber => {


      subscriber.next('Hello');
      subscriber.next('World');
      subscriber.complete();

      // o return de uma observable é acionado apenas uma vez no 'unsubscribe()'
      return () => {
        console.log('finalizada');
      };
    });

    // é possivel chamar a subscription da observable uma vez
    // observable.subscribe(this.observer);

    // também é possivel atribuir a subscription em uma variavel para ter mais possibilidades
    // subscription.add() adiciona mais observables a sua subscription
    // subscription.unsubscribe() encerra o subscription e todas observables vinculadas a ela
    /* const subscription = observable.subscribe(this.observer);
    const subscription2 = observable.subscribe(this.observer);
    subscription.add(subscription2);
    setTimeout(() => {
      subscription.unsubscribe();
    }, 2000); */
  }
}
