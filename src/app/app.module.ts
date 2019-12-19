import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FromeventComponent } from './fromevent/fromevent.component';
import { OfComponent } from './of/of.component';
import { RangeComponent } from './range/range.component';
import { FromComponent } from './from/from.component';
import { IntervalTimerComponent } from './interval-timer/interval-timer.component';
import { MapComponent } from './map/map.component';
import { FilterComponent } from './filter/filter.component';
import { FromeventScrollComponent } from './fromevent-scroll/fromevent-scroll.component';
import { ReduceComponent } from './reduce/reduce.component';
import { ScanComponent } from './scan/scan.component';
import { CountdownComponent } from './countdown/countdown.component';

@NgModule({
  declarations: [
    AppComponent,
    FromeventComponent,
    OfComponent,
    RangeComponent,
    FromComponent,
    IntervalTimerComponent,
    MapComponent,
    FilterComponent,
    FromeventScrollComponent,
    ReduceComponent,
    ScanComponent,
    CountdownComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
