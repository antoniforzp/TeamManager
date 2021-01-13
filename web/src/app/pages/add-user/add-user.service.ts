import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  checkUserMailUrl = 'http://localhost:8080/user/check';
  addUserMailUrl = 'http://localhost:8080/user/add';

  constructor(private http: HttpClient) {}

  public checkEmail(userEmail: string): Observable<any> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    console.log(this.checkUserMailUrl + userEmail);
    return this.http.post(this.checkUserMailUrl + userEmail, {
      headers: myHeaders,
    });
  }

  public addUser(newUser: User): Observable<any> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.post(this.addUserMailUrl, JSON.stringify(newUser), {
      headers: myHeaders,
    });
  }
}
