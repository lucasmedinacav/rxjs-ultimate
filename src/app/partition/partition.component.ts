import { Component, OnInit } from '@angular/core';
import { fromEvent, partition } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-partition',
  templateUrl: './partition.component.html',
  styles: [`#box {
    position: relative;
    height: 100px;
    width: 100px;
    background-color: red;
    margin-top: 20px;
    left: 0;
    transition: left 100ms ease-in-out;
  }
  .container {
    display: flex;
    justify-content: center;
  }`]
})
export class PartitionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const MOVE_SPEED = 20;
    let leftPosition = 0;

    // elems
    const box = document.getElementById('box');

    // streams
    const click$ = fromEvent(document, 'click');
    const xPositionClick$ = click$.pipe(pluck('clientX'));

    // xPositionClick$.subscribe(xPos => {
    //   /*
    //    * Generally if you have a single if statement in
    //    * you subscribe block, prefer filter instead.
    //    */
    //   if(xPos < window.innerWidth / 2) {
    //     box.style.left = `${leftPosition -= MOVE_SPEED}px`;
    //   }
    // });

    /*
     * Filtering for specific condition before subscribe
     */
    // xPositionClick$.pipe(
    //   filter(xPos => xPos < window.innerWidth / 2)
    // ).subscribe(xPos => {
    //   box.style.left = `${leftPosition -= MOVE_SPEED}px`;
    // });

    /*
     * In case of if / else in subscribe...
     */
    // xPositionClick$.subscribe(xPos => {
    //   /*
    //    * Generally if you have a single if statement in
    //    * you subscribe block, prefer filter instead.
    //    */
    //   if(xPos < window.innerWidth / 2) {
    //     box.style.left = `${leftPosition -= MOVE_SPEED}px`;
    //   } else {
    //     box.style.left = `${leftPosition += MOVE_SPEED}px`;
    //   }
    // });

    /*
     * You can use partition instead to create
     * 2 separate streams.
     */
    const [clickLeft$, clickRight$] = partition(
      xPositionClick$,
      xPos => xPos < window.innerWidth / 2
    );

    clickLeft$.subscribe(() => {
      box.style.left = `${leftPosition -= MOVE_SPEED}px`;
    });

    clickRight$.subscribe(() => {
      box.style.left = `${leftPosition += MOVE_SPEED}px`;
    });

  }

}
