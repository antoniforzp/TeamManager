import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { User } from '../model/user';
import { AbstractRestService } from './abstractService';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends AbstractRestService {
  private API_ADD_USER = this.URL + '/user/add';
  private CHECK_USER_EXISTS = this.URL + '/user/check';
  private GET_USERS_TEAMS = this.URL + '/user/getTeams';
  private GET_LOGGED_USER = this.URL + '/user/get';

  constructor(private http: HttpClient) {
    super();
  }

  private getFakeUser(): User {
    return {
      userId: 0,
      name: 'Admin',
      surname: 'Admin',
      email: 'admin@admin.com',
      password: 'admin',
    };
  }

  public checkIfUserExists(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.http.get<boolean>(this.CHECK_USER_EXISTS, { params });
  }

  public getCurrentUser(): Observable<User> {
    return of(this.getFakeUser());
    // TODO: return data from DB
    // return this.http.get<User>(this.GET_LOGGED_USER);
  }

  public getUsersTeams(): Observable<Team[]> {
    return of([
      {
        teamId: 0,
        name: '100 Łódzka Drużyna Harcerzy "Serviam',
        patron: 'im. Jerzego Grodyńskiego',
      },
      {
        teamId: 1,
        name: '87 Wiedźmińska Drużyna Harcerzy "Bajojajo',
        patron: 'im. Jerzego Owsiaka',
      },
    ]);
    // TODO: return data from DB
    // return this.http<Team[]>();
  }

  public addUser(user: User): Observable<boolean> {
    const params = new HttpParams()
      .set('name', user.name)
      .set('surname', user.surname)
      .set('password', user.password)
      .set('email', user.email);
    return this.http.post<boolean>(this.API_ADD_USER, null, { params });
  }
}
