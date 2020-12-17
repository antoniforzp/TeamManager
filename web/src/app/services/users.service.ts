import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public ADD_USER_URL = "http://localhost:8080/user/add";
  public ADD_USER_URL1 = "http://localhost:8080/user/add?name=Antoni&surname=Testowy&password=jojo&email=email@email111.com";
  public CHECK_USER_EXISTS_URL = "http://localhost:8080/user/check";

  constructor(private http: HttpClient) {
  }

  public checkIfUserExists(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.http.get<boolean>(this.CHECK_USER_EXISTS_URL, {params});
  }

  public addUser(user: User): Observable<boolean> {
    const params = new HttpParams()
      .set('name', user.name)
      .set('surname', user.surname)
      .set('password', user.password)
      .set('email', user.email);

    console.log(JSON.stringify(user));

    return this.http.post<boolean>(this.ADD_USER_URL, null, {params});
  }
}
