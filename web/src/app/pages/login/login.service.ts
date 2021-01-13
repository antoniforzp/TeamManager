import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl = 'http://localhost:8080/login/login';

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): void {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const myBody = JSON.stringify({email, password});
    this.http.post(this.loginUrl, myBody, { headers: myHeaders }).subscribe((x) => console.log(x));
  }
}