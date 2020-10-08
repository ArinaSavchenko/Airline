import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterModel } from '../Models/RegisterModel';
import { RequestResult } from '../Models/RequestResult';

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

  addUser(model: RegisterModel): Observable<RequestResult> {
    return this.http.post<RequestResult>(this.usersUrl + '/register', model, this.httpOptions);
  }

  logIn(model): Observable<RequestResult>{
    return this.http.post<RequestResult>(this.usersUrl + '/authenticate', model, this.httpOptions);
  }
}
