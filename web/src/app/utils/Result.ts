import { Subject } from 'rxjs';

export enum Result {
  Success,
  Failure,
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
