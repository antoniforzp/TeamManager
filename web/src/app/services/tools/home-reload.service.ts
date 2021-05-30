import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeReloadService {
  private reloadSubject = new Subject<void>();

  constructor() {}

  public get reload(): Subject<void> {
    return this.reloadSubject;
  }

  public emitReload(): void {
    this.reloadSubject.next();
  }
}
