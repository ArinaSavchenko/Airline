import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';

import { RegisterModel } from '../Models/RegisterModel';
import { ResponseModel } from '../Models/ResponseModel';
import { User } from '../Models/User';
import { UpdateUserModel } from '../Models/UpdateUserModel';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private usersUrl = environment.baseUrl + '/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
  }

  registerUser(model: RegisterModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.usersUrl + '/register', model, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getUser(): Observable<User> {
    const id = this.getUserId();
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url);
  }

  logIn(model): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.usersUrl + '/authenticate', model, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  updateUser(user: UpdateUserModel): Observable<ResponseModel> {
    const url = `${this.usersUrl}/update/${user.id}`;
    return this.http.put<ResponseModel>(url, user, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  changePassword(password): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(this.usersUrl + '/update-password', password, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token !== null && !this.jwtHelper.isTokenExpired(token) && this.getUserRole() === 'user')
      return true;
    else {
      return false;
    }
  }

  logOut(): void {
    localStorage.removeItem('token');
  }

  deleteUser(id: number): Observable<ResponseModel> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<ResponseModel>(url, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    return of(error.error);
  }

  getUserId(): number {
    const tokenParts = localStorage.getItem('token').split(/\./);
    const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
    const userId = +tokenDecoded.sub;
    return userId;
  }

  getUserRole(): string {
    const tokenParts = localStorage.getItem('token').split(/\./);
    const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
    const userRole = tokenDecoded.role;
    return userRole;
  }
}
