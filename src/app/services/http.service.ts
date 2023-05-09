import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Query, QueryParams} from "../model/QueryParams";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getAll(queryParams: QueryParams, type: number): Observable<any> {
    return this.http.get<any>(
      environment.apiBaseUrl + '/' + this.getUrl(type) + this.generateQueryParams(queryParams)
    )
  }

  getData(slug: string, type: number): Observable<any> {
    return this.http.get<any>(
      environment.apiBaseUrl + '/' + this.getUrl(type) + '/' + slug
    )
  }

  getContent(url: string, query: Query): Observable<any> {
    return this.http.get<any>(
      environment.apiBaseUrl + url + this.generateQueryParams(query)
    )
  }

  saveImage(data: FormData) {
    return this.http.post<any>(
      environment.apiBaseUrl + '/api/image/file', data
    )
  }

  saveContent(type: number, dataSource: any) {
    return this.http.post(
      environment.apiBaseUrl + '/' + this.getUrl(type) + '/save', dataSource
    )
  }

  private getUrl(type: number): string {
    switch (type) {
      case 1:
        return 'api/books'
      case 2:
        return 'api/authors'
      case 3:
        return 'api/genres'
      case 4:
        return 'api/tags'
      default:
        return ''
    }
  }

  private generateQueryParams(query: Query): string {
    let index = 0,
      finalQueryParams = ''
    for (let [key, value] of Object.entries(query)) {
      if (value != null) {
        finalQueryParams += index === 0 ? `?${key}=${value}` : `&${key}=${value}`
        index++
      }
    }
    return finalQueryParams
  }

}
