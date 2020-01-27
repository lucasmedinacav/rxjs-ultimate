import { Component, OnInit } from '@angular/core';
import { fromEvent, of, combineLatest } from 'rxjs';
import { map, delay, tap, filter, share, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.css']
})
export class MortgageCalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // elems
    const loanAmount = document.getElementById('loanAmount');
    const interest = document.getElementById('interest');
    const loanLength = document.querySelectorAll('.loanLength');
    const expected = document.getElementById('expected');

    const createInputValueStream = elem => {
      return fromEvent(elem, 'input').pipe(
        map((event: any) => parseFloat(event.target.value))
      );
    };

    const saveResponse = mortageAmount => {
      return of(mortageAmount).pipe(delay(1000));
    };

    const interest$ = createInputValueStream(interest);
    const loanLength$ = createInputValueStream(loanLength);
    const loanAmount$ = createInputValueStream(loanAmount);

    const calculation$ = combineLatest(interest$, loanAmount$, loanLength$).pipe(
      map(([interest, loanAmount, loanLength]) => {
        return this.calculateMortgage(interest, loanAmount, loanLength);
      }),
      tap(console.log),
      filter(mortageAmount => !isNaN(mortageAmount)),
      share()
    );

    calculation$.subscribe(mortageAmount => {
      expected.innerHTML = mortageAmount;
    });

    calculation$
      .pipe(mergeMap(mortageAmount => saveResponse(mortageAmount)))
      .subscribe();
  }

  calculateMortgage(interest, loanAmount, loanLength) {
    const calculatedInterest = interest / 1200;
    const total =
      (loanAmount * calculatedInterest) /
      (1 - Math.pow(1 / (1 + calculatedInterest), loanLength));

    return total.toFixed(2);
  }

}
