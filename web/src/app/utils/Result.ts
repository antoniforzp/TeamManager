import { Subject } from 'rxjs';

export interface Result {
  show: boolean;
  result?: boolean;
}

export function hideWithTimeout(subject: Subject<Result>): void {
  setTimeout(() => {
    subject.next({
      show: false,
    });
  }, 2000);
}
