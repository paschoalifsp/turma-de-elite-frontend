import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
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
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router,
    private translateService: TranslateService
    ) { }

  login(){
    this.isLoading = true;
    const {email,password} = this.loginForm.value;
    this.auth.login(email,password).catch(error => {
        switch (error?.code){
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            this.isEmailInvalid = true;
            break;
          case 'auth/wrong-password':
            this.isPasswordInvalid = true;
            break;
          default:
            this.showSnackbar('Erro inesperado');
            break;

        }
      }).finally(() => {
        this.isLoading = false;
    });
  }

  showSnackbar(message: string){
    this.snackbar.open(message,'Fechar', {
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition
    });
  }

}
