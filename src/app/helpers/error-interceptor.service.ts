import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {InfoService} from "../services/info.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private infoService: InfoService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse): any => {

      switch (err.status) {
        case 0:
          this.infoService.openSnackBar("Нет соединения с сервером")
          break
        case 403:
          this.infoService.openSnackBar("Доступ запрещен")
          break
        case 409:
          this.infoService.openSnackBar(err.error)
          break
        case 500:
          this.infoService.openSnackBar("Ошибка на сервере")
          break
        default:
          this.infoService.openSnackBar(err.status)
          break
      }
      return of(null)
    }))
  }
}
