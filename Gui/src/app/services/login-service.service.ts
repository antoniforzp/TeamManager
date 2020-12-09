import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private readonly usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'Access-Control-Allow-Origin: http://localhost:8080/login';
  }

  public login(): void {
    this.http.get<string>(this.usersUrl).toPromise().then(value => console.log(value));
  }
}
