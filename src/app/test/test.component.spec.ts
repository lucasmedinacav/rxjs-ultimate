import { concat, from, of } from 'rxjs';
import { map, take, delay, mergeMap, toArray } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

describe('RXJS Testing', () => {


  let testScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should convert ASCII digrams into observables', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable } = helpers;
      const source$ = cold('--a-b---c');
      const expected = '--a-b---c';

      expectObservable(source$).toBe(expected);
    });
  });

  it('should allow configuration of emitted values', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable } = helpers;
      const source$ = cold('--a-b---c', { a: 1, b: 2, c: 3 });
      const final$ = source$.pipe(map((val: number) => val * 10));
      const expected = '--a-b---c';

      expectObservable(final$).toBe(expected, { a: 10, b: 20, c: 30 });
    });
  });

  it('should let you identify subscription points', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const source$ = cold('-a---b-|');
      const sourceTwo$ = cold('-c---d-|');
      const final$ = concat(source$, sourceTwo$);

      const expected = '-a---b--c---d-|';
      const sourceOneExpectedSub = '^------!';
      const sourceTwoExpectedSub = '-------^------!';

      expectObservable(final$).toBe(expected);
      expectSubscriptions(source$.subscriptions).toBe(sourceOneExpectedSub);
      expectSubscriptions(sourceTwo$.subscriptions).toBe(sourceTwoExpectedSub);
    });
  });

  it('should let you test hot observables', () => {
    testScheduler.run(helpers => {
      const { hot, expectObservable } = helpers;
      const source$ = hot('--a-b-^-c');
      const final$ = source$.pipe(take(1));
      const expected = '--(c|)';

      expectObservable(final$).toBe(expected);
    });
  });

  it('should let you test synchronous operations', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable } = helpers;
      const source$ = from([1, 2, 3, 4, 5]);
      const expected = '(abcde|)';

      expectObservable(source$).toBe(expected, { a: 1, b: 2, c: 3, d: 4, e: 5 });
    });
  });

  it('should let you test asynchronous operations', () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const source$ = from([1, 2, 3, 4, 5]);
      const final$ = source$.pipe(delay(200));
      const expected = '200ms (abcde|)';

      expectObservable(final$).toBe(expected, { a: 1, b: 2, c: 3, d: 4, e: 5 });
    });
  });

  it('should let you test async operations with done callback', done => {
    const source$ = of('Ready', 'Set', 'Go!').pipe(
      mergeMap((message, index) => of(message).pipe(
        delay(index * 1000)
      ))
    );

    const expected = ['Ready', 'Set', 'Go!'];
    let index = 0;

    source$.subscribe(val => {
      expect(val).toEqual(expected[index]);
      index++;
    }, null, done);
  });

  it('should compare emitted values on completion with toArray', () => {
    const source$ = of(1, 2, 3);
    const final$ = source$.pipe(
      map(val => val * 10),
      toArray()
    );

    const expected = [10, 20, 30];
    final$.subscribe(val => {
      expect(val).toEqual(expected);
    });
  });
});
