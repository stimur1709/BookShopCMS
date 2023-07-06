import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  public showPassword = false

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.formBuild()
  }

  public changeShowPassword(event: MouseEvent): void {
    event.preventDefault()
    this.showPassword = !this.showPassword
  }

  private formBuild(): void {
    this.loginForm = new FormGroup({
      contact: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    })
  }

  public onSubmit(tag: 'loginForm'): void {
    if (this[tag].status === 'VALID') {
      this.authenticationService.login(this[tag].value)
    }
  }
}
