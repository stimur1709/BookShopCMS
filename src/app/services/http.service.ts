import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Query} from "../model/QueryParams";
import {LoginInterface} from "../model/Data";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getContent(url: string, slug: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/${url}/${slug}`
    )
  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/${url}`
    );
  }

  getContents(url: string, query: Query): Observable<any> {
    return this.http.get<any>(
      environment.apiBaseUrl + '/' + url + this.generateQueryParams(query)
    )
  }

  saveImage(data: FormData) {
    return this.http.post<any>(
      environment.apiBaseUrl + '/api/image/file', data
    )
  }

  saveContent(url: string, dataSource: any) {
    return this.http.post(
      environment.apiBaseUrl + '/' + url + '/save', dataSource
    )
  }

  login(data: LoginInterface) {
    return this.http.post<any>(`${environment.apiBaseUrl}/login`, data)
  }

  delete(url: string, id: number) {
    console.log(`${environment.apiBaseUrl}/${url}/delete/${id}`)
    return this.http.delete<any>(`${environment.apiBaseUrl}/${url}/delete/${id}`)
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

  public getUrl(type: number): string {
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
}
