import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

export interface Response {
  data: any;
  timestamp: Date;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private origin = 'http://localhost:8080';
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  constructor(private http: HttpClient) {}

  public resolve<T>(request: Request): Observable<T> {
    switch (request.method) {
      case REST.POST: {
        return this.http
          .post<Response>(
            this.origin + request.url,
            JSON.stringify(request.body),
            {
              headers: this.headers,
            }
          )
          .pipe(map((x) => x.data));
      }

      case REST.GET: {
        if (request.body) {
          console.log('GET method does not resolve body!');
        }
        return this.http
          .get<Response>(this.origin + request.url, {
            headers: this.headers,
          })
          .pipe(map((x) => x.data));
      }

      case REST.PATCH: {
        return this.http
          .patch<Response>(
            this.origin + request.url,
            JSON.stringify(request.body),
            {
              headers: this.headers,
            }
          )
          .pipe(map((x) => x.data));
      }

      case REST.DELETE: {
        if (request.body) {
          console.log('DELETE method does not resolve body!');
        }
        return this.http
          .delete<Response>(this.origin + request.url, {
            headers: this.headers,
          })
          .pipe(map((x) => x.data));
      }
    }
  }
}
