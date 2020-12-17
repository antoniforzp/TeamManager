import {Injectable} from '@angular/core';
import {from, Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoutsService {
  configUrl = 'http://localhost:8080/scouts/list '

  constructor(private http: HttpClient) {
  }

  myScouts = [
    this.getFakeScout(),
    this.getFakeScout(),
    this.getFakeScout(),
    this.getFakeScout()
  ]

  private getFakeScout() {
    return {
      scoutId: 0,
      name: "Antoni",
      surname: 'Forzpanczyk',
      pesel: '00000000000',
      birthDate: new Date(),
    }
  }
}
