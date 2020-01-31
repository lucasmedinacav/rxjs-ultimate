import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    const loadingOverlay = document.getElementById('loading-overlay');

    this.loadingService.geLloadingStatus().subscribe(isLoading => {
      if (isLoading) {
        loadingOverlay.classList.add('open');
      } else {
        loadingOverlay.classList.remove('open')
      }
    });

    this.loadingService.showLoading();

    setTimeout(() => this.loadingService.hideLoading(), 1500);

  }

}
