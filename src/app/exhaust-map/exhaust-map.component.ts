import { OnInit, Component } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { fromEvent } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

@Component({
    selector: 'app-exhaust-map',
    templateUrl: './exhaust-map.component.html'
})
export class ExhaustMapComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        const authenticateUser = () => {
            return ajax.post(
                'https://reqres.in/api/login',
                {
                    email: 'eve.holt@reqres.in',
                    password: 'cityslicka'
                });
        };

        const loginBtn = document.querySelector('#loginBtn');

        fromEvent(loginBtn, 'click').pipe(
            exhaustMap(() => authenticateUser())
        ).subscribe(console.log);
    }
}