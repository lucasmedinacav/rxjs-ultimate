import { Component, OnInit } from '@angular/core';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';
import { animationFrameScheduler, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-animation-frame-scheduler',
  templateUrl: './animation-frame-scheduler.component.html',
  styles: [`
  #ball {
    height: 75px;
    width: 75px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    translate: translate3d(0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
  }`]
})
export class AnimationFrameSchedulerComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const ball = document.getElementById('ball');

    // animationFrameScheduler.schedule(function (position) {
    //   ball.style.transform = `translate3d(0, ${position}px, 0)`;
    //   if (position <= 300) {
    //     this.schedule(position + 1);
    //   }
    // }, 0, 0);

    // É A MESMA FUNÇÃO QUE A COMENTADA ACIMA, PORÉM MAIS SIMPLES
    interval(0, animationFrameScheduler).pipe(
      takeWhile(val => val <= 300)
    ).subscribe(val =>
      ball.style.transform = `translate3d(0, ${val}px, 0)`);
  }
}
