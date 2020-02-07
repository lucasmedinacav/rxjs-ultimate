import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, throttleTime, debounceTime, auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-fromevent-scroll',
  templateUrl: './fromevent-scroll.component.html',
  styles: [`
    .progress-bar {
      position: fixed;
      top:0;
      height:4px;
      width: 0%;
      background: #ff16b7;
    }
    ::ng-deep body{
      margin:0px;
    }
  `]
})
export class FromeventScrollComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const progressBar: any = document.querySelector('.progress-bar');

    const eventScroll$ = fromEvent(document, 'scroll')
      .pipe(
        throttleTime(30),
        map(({ target }: any) =>
          this.calculateScrollPercent(
            target.documentElement
          ))
      ).subscribe(percent => {
        console.log(percent);
        progressBar.style.width = `${percent}%`;
      });
  }

  private calculateScrollPercent(element): number {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = element;

    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }

}
