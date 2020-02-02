import { Component, OnInit } from '@angular/core';
import { ObservableStoreService } from './observable-store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit {

  constructor(private store: ObservableStoreService) {
  }

  ngOnInit() {

    this.store.init({
      user: 'joe',
      isAuthenticated: true
    });

    this.store.stateChanges().subscribe(data => console.log('escutando', data));

    /*
     * Select a slice of state from store.
     */
    this.store.selectState('user').subscribe(console.log);

    /*
     * Update a property with new value.
     */
    this.store.updateState({
      user: 'bob'
    });

    this.store.updateState({
      isAuthenticated: true
    });


    /*
     * Selected state above (user) only emits when value has changed
     * for the requested property.
     */
    this.store.updateState({
      isAuthenticated: false
    });

    this.store.selectState('isAuthenticated').subscribe(console.log);
  }
}
