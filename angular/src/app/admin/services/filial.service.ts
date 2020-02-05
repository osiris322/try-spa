import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { config } from 'src/app/config';
import { Filial } from 'src/app/_models/filial';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const url = '/admin/filials';

@Injectable({
  providedIn: 'root'
})
export class FilialService {

  constructor(private http: HttpClient) { }
  
    getFilials(): Observable<Filial[]> {
    return this.http.get<Filial[]>(`${config.apiUrl}${url}`)
      .pipe(
        tap(filial => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
    }

    /*getProduct(id: number): Observable<Product> {
      const url = `${apiUrl}/${id}`;
      return this.http.get<Product>(url).pipe(
        tap(_ => console.log(`fetched product id=${id}`)),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
    }*/

    addFilial(filial: Filial): Observable<Filial> {
      return this.http.post<Filial>(`${config.apiUrl}${url}`, filial, httpOptions).pipe(
        tap((prod: Filial) => console.log(`added product w/ id=${filial.id}`)),
        catchError(this.handleError<Filial>('addFilial'))
      );
    }

    /*updateProduct(id: any, product: Product): Observable<any> {
      const url = `${apiUrl}/${id}`;
      return this.http.put(url, product, httpOptions).pipe(
        tap(_ => console.log(`updated product id=${id}`)),
        catchError(this.handleError<any>('updateProduct'))
      );
    }

    deleteProduct(id: any): Observable<Product> {
      const url = `${apiUrl}/${id}`;
      return this.http.delete<Product>(url, httpOptions).pipe(
        tap(_ => console.log(`deleted product id=${id}`)),
        catchError(this.handleError<Product>('deleteProduct'))
      );
    }*/
  
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
