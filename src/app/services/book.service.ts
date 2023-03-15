import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BooksPage} from "../model/BooksPage";
import {environment} from "../environments/environment";
import {QueryParams} from "../model/QueryParams";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  getAll(queryParams: QueryParams): Observable<BooksPage> {
    console.log(queryParams)
    return this.http.get<BooksPage>(
      environment.apiBaseUrl + 'api/books',
      {
        'params': {
          'offset': queryParams.offset,
          'limit': queryParams.limit,
          'property': queryParams.property,
          'reverse': queryParams.reverse
        }
      }
    )
  }
}
