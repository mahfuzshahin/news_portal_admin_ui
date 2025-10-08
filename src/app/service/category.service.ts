import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  getCategory() {
    return this.httpClient.get<any>('http://localhost:3000/category' ).pipe(
      catchError((error: any): Observable<any> => {
        console.log(error)
        if (error.status === 404) {
          console.log(error.error.message || 'No employees found.');
        } else {
          console.log(error.error.message || 'An error occurred while fetching employees.');
        }
        return of([]);
      })
    );
  }
}
