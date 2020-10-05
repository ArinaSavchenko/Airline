import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';

import { UserForRegistration } from '../Models/UserForRegistration';

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

  addUser(user: UserForRegistration): void {
    console.log(this.usersUrl);
    this.http.post(this.usersUrl, user, this.httpOptions);
  }
}
