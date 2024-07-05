import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError('An error occurred');
  }

  get<T>(url: string, options?: any): any{
    return this.http.get<T>(url, options).pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: any, options?: any): any {
    return this.http.post<T>(url, body, options).pipe(catchError(this.handleError));
  }

  getMessage(){
    return "Service is working";
  }
}
