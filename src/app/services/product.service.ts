// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5010/api/product/details'; // Your .NET Core API URL

  constructor(private http: HttpClient) {}

  getProductDetails(asin: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, asin).pipe(
      catchError((error) => {
        console.error('Error fetching product details:', error);
        return throwError(error);
      })
    );
  }
}
