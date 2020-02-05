import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap, map, first } from 'rxjs/operators';
import { config } from './../../config';
import { Tokens } from '../models/tokens';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  private pyloadEncode: string;
  private pyloadJson;
  

  constructor(private http: HttpClient) {}
  
  login(user: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/auth/login`, user)
      .pipe(
        first(),
        map(response => {
           if (response.success) {
              this.doLoginUser(user.username, response.data);
           } else {
               this.doLogoutUser();
           }
           return response;
        }),
        catchError(error => {
          return of(false);
        }));
  }

  logout() {
    return this.http.post<any>(`${config.apiUrl}/auth/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));

  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${config.apiUrl}/auth/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
            tap((tokens) => {
                this.storeJwtToken(tokens.data);
            }),
            map(response => {
            if (response.success) {
               return response.data;
            } else {
                this.doLogoutUser();
                return false;
            }
           
        }),
      );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getUsername() {
    this.parseJwt();
    return this.pyloadJson.data.username;   
  }
  
  private parseJwt() {
    let jwt = localStorage.getItem(this.JWT_TOKEN);
    let payload = jwt.split('.');
    this.pyloadEncode = payload[1];
    let encodeData = this.pyloadEncode;
    let decodeData = atob(encodeData);
    this.pyloadJson = JSON.parse(decodeData);
  }
  
  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
