import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {QueryParams} from "../model/QueryParams";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string

  constructor(private http: HttpClient) {
  }

  getAll(queryParams: QueryParams): Observable<any> {
    return this.http.get<any>(
      environment.apiBaseUrl + this.url + this.generateQueryParams(queryParams)
    )
  }

  private generateQueryParams(queryParams: QueryParams): string {
    let index = 0,
      finalQueryParams = ''
    for (let [key, value] of Object.entries(queryParams)) {
      finalQueryParams += index === 0 ? `?${key}=${value}` : `&${key}=${value}`
      index++
    }
    return finalQueryParams
  }
}
