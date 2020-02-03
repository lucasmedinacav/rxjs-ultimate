import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AnimationFrameSchedulerComponent } from './animation-frame-scheduler/animation-frame-scheduler.component';
import { AppComponent } from './app.component';
import { AsapSchedulerComponent } from './asap-scheduler/asap-scheduler.component';
import { AsyncSchedulerComponent } from './async-scheduler/async-scheduler.component';
import { AsyncSubjectComponent } from './async-subject/async-subject.component';
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';
import { ConcatMapComponent } from './concat-map/concat-map.component';
import { ConcatComponent } from './concat/concat.component';
import { CountdownComponent } from './countdown/countdown.component';
import { DebounceTimeComponent } from './debounce-time/debounce-time.component';
import { DistinctUntilChangedComponent } from './distinct-until-changed/distinct-until-changed.component';
import { ExhaustMapComponent } from './exhaust-map/exhaust-map.component';
import { FilterComponent } from './filter/filter.component';
import { FlatMapComponent } from './flat-map/flat-map.component';
import { ForkJoinComponent } from './fork-join/fork-join.component';
import { FromComponent } from './from/from.component';
import { FromeventScrollComponent } from './fromevent-scroll/fromevent-scroll.component';
import { FromeventComponent } from './fromevent/fromevent.component';
import { IntervalTimerComponent } from './interval-timer/interval-timer.component';
import { LoadingComponent } from './loading/loading.component';
import { MapComponent } from './map/map.component';
import { MergeMapComponent } from './merge-map/merge-map.component';
import { MortgageCalculatorComponent } from './mortgage-calculator/mortgage-calculator.component';
import { MulticastShareComponent } from './multicast-share/multicast-share.component';
import { OfComponent } from './of/of.component';
import { PollingDogComponent } from './polling-dog/polling-dog.component';
import { QueueSchedulerComponent } from './queue-scheduler/queue-scheduler.component';
import { RangeComponent } from './range/range.component';
import { ReduceComponent } from './reduce/reduce.component';
import { ReplaySubjectComponent } from './replay-subject/replay-subject.component';
import { ScanComponent } from './scan/scan.component';
import { ShareReplayComponent } from './share-replay/share-replay.component';
import { StartEndWithComponent } from './start-end-with/start-end-with.component';
import { StoreComponent } from './store/store.component';
import { SubjectComponent } from './subject/subject.component';
import { SwitchMapComponent } from './switch-map/switch-map.component';
import { TakeUntilComponent } from './take-until/take-until.component';
import { TakeComponent } from './take/take.component';
import { TapComponent } from './tap/tap.component';
import { TestComponent } from './test/test.component';
import { CustomRetryComponent } from './custom-retry/custom-retry.component';
import { WithLatestFromComponent } from './with-latest-from/with-latest-from.component';
import { PartitionComponent } from './partition/partition.component';


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
    CountdownComponent,
    TapComponent,
    TakeComponent,
    TakeUntilComponent,
    DistinctUntilChangedComponent,
    DebounceTimeComponent,
    MergeMapComponent,
    FlatMapComponent,
    SwitchMapComponent,
    ConcatMapComponent,
    ExhaustMapComponent,
    PollingDogComponent,
    StartEndWithComponent,
    ConcatComponent,
    CombineLatestComponent,
    ForkJoinComponent,
    MortgageCalculatorComponent,
    SubjectComponent,
    LoadingComponent,
    MulticastShareComponent,
    AsyncSubjectComponent,
    AsyncSchedulerComponent,
    AsapSchedulerComponent,
    AnimationFrameSchedulerComponent,
    QueueSchedulerComponent,
    BehaviorSubjectComponent,
    StoreComponent,
    ReplaySubjectComponent,
    ShareReplayComponent,
    TestComponent,
    CustomRetryComponent,
    WithLatestFromComponent,
    PartitionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
