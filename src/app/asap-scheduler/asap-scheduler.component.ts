import { Component, OnInit } from '@angular/core';
import { asyncScheduler, asapScheduler, range } from 'rxjs';

@Component({
  selector: 'app-asap-scheduler',
  templateUrl: './asap-scheduler.component.html'
})
export class AsapSchedulerComponent implements OnInit {

  counter = 0;

  constructor() { }

  ngOnInit() {
    const observer = {
      next: val => console.log('next', val),
      error: err => console.log('error', err),
      complete: () => console.log('complete')
    };

    /*
     * The asapScheduler executes tasks asynchronously but
     * 'as quickly as possible', similar to microtasks.
     * For instance, even though our task scheduled with
     * the asapScheduler appears after the asyncScheduler
     * task, it will be executed before, but not before the
     * synchronous console.log. This is the same behavior
     * you would see with Promise.resolve or queueMicrotask.
     */
    asyncScheduler.schedule(() => console.log('asyncScheduler'));
    queueMicrotask(() => console.log('queueMicrotask'));
    Promise.resolve('fromPromise').then(console.log);
    asapScheduler.schedule(() => console.log('asapScheduler'));
    console.log('synchronous');

    // aula mostra que se fizer um range com asap, na tela aparece com resultado final,
    // e se fizer com async mostra o contador se mexendo
    range(1, 10000, asyncScheduler).subscribe(val => {
      this.counter = val;
    });

  }

  // Defer task execution with the Asap Scheduler
}
