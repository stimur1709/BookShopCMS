import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../model/Data";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public isAuth: User | null = null

  constructor(
    public translateService: TranslateService,
    public authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.authenticationService.userObs
      .subscribe((user) => {
        this.isAuth = user
      })
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang)
  }

}
