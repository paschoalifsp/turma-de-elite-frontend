import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm = this.fb.group({
    email: ['',Validators.email],
    password: ['', Validators.required]
  })

  isEmailInvalid = false;
  isPasswordInvalid = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private snackbar: SnackbarService,
    private translateService: TranslateService,
    private router: Router
    ) { }

  login(){
    this.isLoading = true;
    const {email,password} = this.loginForm.value;
    this.auth.login(email,password).catch(error => {
        switch (error?.code){
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            this.showSnackbar("fieldErrors.accountNotFound");
            this.isEmailInvalid = true;
            break;
          case 'auth/wrong-password':
            this.showSnackbar("fieldErrors.passwordWrong");
            this.isPasswordInvalid = true;
            break;
          default:
            this.showSnackbar("fieldErrors.tooManyRequests");
            break;
        }
      }).finally(() => {
        this.isLoading = false;
    });
  }

  showSnackbar(message: string){
    this.translateService.get(message).subscribe((translation) => {
      this.snackbar.showSnack(translation, "labels.close");
    })
  }

}
