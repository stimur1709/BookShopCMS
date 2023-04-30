import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang)
  }

}
