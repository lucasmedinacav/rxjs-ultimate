import { concat, from } from 'rxjs';
import { map, take, delay } from 'rxjs/operators';
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
});
