import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../model/web/Response';
import { AppStateService } from '../services/core/app-state.service';

export enum REST {
  POST,
  GET,
  PATCH,
  DELETE,
}

export interface Request {
  url: string;
  method: REST;
  body?: any;
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private origin = 'http://localhost:8080';

  constructor(private http: HttpClient, private app: AppStateService) {}

  constructHeaders(): any {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.app.authToken,
    };
  }

  public resolve<T>(request: Request): Observable<T> {
    const headers = this.constructHeaders();

    let response: Observable<T>;

    switch (request.method) {
      case REST.POST:
        {
          response = this.http
            .post<ApiResponse<T>>(
              this.origin + request.url,
              JSON.stringify(request.body),
              { headers }
            )
            .pipe(map((x) => x.data));
        }
        break;

      case REST.GET:
        {
          if (request.body) {
            console.log('GET method does not resolve body!');
          }
          response = this.http
            .get<ApiResponse<T>>(this.origin + request.url, {
              headers,
            })
            .pipe(map((x) => x.data));
        }
        break;

      case REST.PATCH:
        {
          response = this.http
            .patch<ApiResponse<T>>(
              this.origin + request.url,
              JSON.stringify(request.body),
              { headers }
            )
            .pipe(map((x) => x.data));
        }
        break;

      case REST.DELETE:
        {
          if (request.body) {
            console.log('DELETE method does not resolve body!');
          }
          response = this.http
            .delete<ApiResponse<T>>(this.origin + request.url, {
              headers,
            })
            .pipe(map((x) => x.data));
        }
        break;
    }

    return response;
  }
}
