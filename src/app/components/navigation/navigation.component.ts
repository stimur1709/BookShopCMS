import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../model/Data";
import {HttpService} from "../../services/http.service";
import {take} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public isAuth: User | null = null;
  unconfirmedReview: number = 0;

  constructor(
    public translateService: TranslateService,
    public authenticationService: AuthenticationService,
    private service: HttpService
  ) {
  }

  ngOnInit(): void {
    this.authenticationService.userObs
      .subscribe((user) => {
        this.isAuth = user
      });
    setInterval(() => this.getUnconfirmedReview(), 1000);
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang)
  }

  getUnconfirmedReview(): void {
    this.service.getData('api/review/unconfirmed')
      .pipe(take(1))
      .subscribe(
        (data) => this.unconfirmedReview = data
      );
  }

}
