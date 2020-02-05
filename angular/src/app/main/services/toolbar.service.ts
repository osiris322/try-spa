import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { config } from 'src/app/config';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor(private http: HttpClient) {}

  public getName() {
    return this.http.get<any>(`${config.apiUrl}/auth/random`)
      .pipe(
        map(data => data.data.value)
      );
  }
}
