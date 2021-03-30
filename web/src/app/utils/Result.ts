import { Subject } from 'rxjs';

export enum Result {
  Failure = 0,
  Success = 1,
  Cancel = 2,
}
export interface ResultOld {
  show: boolean;
  result?: boolean;
}

export function hideWithTimeout(subject: Subject<ResultOld>): void {
  setTimeout(() => {
    subject.next({
      show: false,
    });
  }, 2000);
}
