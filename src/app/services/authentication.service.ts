import {Injectable} from '@angular/core';
import {BehaviorSubject, take} from "rxjs";
import {AuthInterface, LoginInterface, User} from "../model/Data";
import {HttpService} from "./http.service";
import {InfoService} from "./info.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userData$ = new BehaviorSubject<User | null>(null)

  constructor(
    private httpService: HttpService,
    private infoService: InfoService,
    private router: Router
  ) {
  }

  public get userObs() {
    return this._userData$.asObservable()
  }

  public setUserObs(data: User | null) {
    this._userData$.next(data)
  }

  public login(data: LoginInterface) {
    return this.httpService.login(data)
      .pipe(take(1))
      .subscribe((auth: AuthInterface) => {
        this.loginHandler(auth)
      })
  }

  private loginHandler(auth: AuthInterface): void {
    if (auth.token != null && auth.roles.includes('ROLE_ADMIN')) {
      localStorage.setItem('user', auth.token)
      this.setUserObs({token: auth.token});
    } else {
      this.infoService.openSnackBar(auth.error != null ? auth.error : 'Недостаточно прав')
    }
  }

  public checkAuth(): void {
    let token = localStorage.getItem('user');
    if (token != null) {
      this.setUserObs({token: token});
    }
  }

  logout() {
    this.router.navigate(['']).then(() => {
      localStorage.removeItem('user');
      this.setUserObs(null);
    })
  }

}
