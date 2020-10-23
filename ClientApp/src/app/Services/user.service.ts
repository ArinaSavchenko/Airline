import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterModel } from '../Models/RegisterModel';
import { ResponseModel } from '../Models/ResponseModel';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private usersUrl = environment.baseUrl + '/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  register(model: RegisterModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.usersUrl + '/register', model, this.httpOptions).pipe(
      catchError(error => this.errorHandling(error))
    );
  }

  logIn(model): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.usersUrl + '/authenticate', model, this.httpOptions).pipe(
      catchError(error => this.errorHandling(error))
    );
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  errorHandling(error: HttpErrorResponse): Observable<any>{
    return of(error.error);
  }
}
