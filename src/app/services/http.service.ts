import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {QueryParams} from "../model/QueryParams";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getAll(queryParams: QueryParams, url: string): Observable<any> {
    return this.http.get<any>(
      environment.apiBaseUrl  + '/' + url + this.generateQueryParams(queryParams)
    )
  }

  getData(slug: string, url: string): Observable<any> {
    return this.http.get<any>(
      environment.apiBaseUrl + '/' + url + '/' + slug
    );
  }

  private generateQueryParams(queryParams: QueryParams): string {
    let index = 0,
      finalQueryParams = ''
    for (let [key, value] of Object.entries(queryParams)) {
      if (value != null) {
        finalQueryParams += index === 0 ? `?${key}=${value}` : `&${key}=${value}`
        index++
      }
    }
    return finalQueryParams
  }

}
