import { Subject } from 'rxjs';

export enum Results {
  ERROR = -1,
  FAILURE = 0,
  SUCCESS = 1,
  CANCEL = 2,
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
