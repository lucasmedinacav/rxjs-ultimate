import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

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
        map(({ target }: any) =>
          this.calculateScrollPercent(
            target.documentElement
          ))
      ).subscribe(percent => {
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
