import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  constructor() { }

  private loading$ = new Subject();


  showLoading() {
    this.loading$.next(true);
  }

  hideLoading() {
    this.loading$.next(false);
  }

  geLloadingStatus() {
    return this.loading$.asObservable();
  }
}
