import {Component, OnInit} from '@angular/core';
import {User} from "../../model/Data";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public isAuth: User | null = null

  constructor(
    public authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.authenticationService.userObs
      .subscribe((user) => {
        this.isAuth = user
      })
  }
}
