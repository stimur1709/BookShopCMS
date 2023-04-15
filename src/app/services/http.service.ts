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

  getAll(queryParams: QueryParams, type: number): Observable<any> {
    console.log(queryParams)
    return this.http.get<any>(
      environment.apiBaseUrl + '/' + this.getUrl(type) + this.generateQueryParams(queryParams)
    )
  }

  getData(slug: string, type: number): Observable<any> {
    return this.http.get<any>(
      environment.apiBaseUrl + '/' + this.getUrl(type) + '/' + slug
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
