import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterModel } from '../Models/RegisterModel';

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

  addUser(model: RegisterModel): Observable<Response> {
    return this.http.post<Response>(this.usersUrl + '/register', model, this.httpOptions);
  }

  logIn(model): Observable<Response>{
    return this.http.post<Response>(this.usersUrl + '/authenticate', model, this.httpOptions);
  }
}
