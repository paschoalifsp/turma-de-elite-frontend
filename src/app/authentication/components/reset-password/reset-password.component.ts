import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CustomStateMatcher} from "../../../shared/utils/error-state-matcher";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  resetPasswordForm = this.fb.group({
    email: ['',Validators.email]
  });

  isEmailInvalid = false;
  stateMatcher = new CustomStateMatcher();
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(
    private authentication: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    ) { }

  sendResetPasswordEmail(){
    this.resetPasswordForm.markAllAsTouched();
    this.authentication.sendResetPasswordEmail(this.resetPasswordForm.value.email)
      .then(value => {
        this.sendSuccess();
      })
      .catch(err => {
        if(err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found'){
          this.invalidEmailMessage();
        }
      });
  }

  sendSuccess(){
    this.snackbar.open('E-mail de reset de senha enviado com sucesso','OK', {
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition
    })
      .afterDismissed()
      .subscribe(value => {
        this.router.navigate(['/login']);
      });
  }

  invalidEmailMessage(){
    this.snackbar.open('Não foi possível encontrar sua conta','Fechar',{
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition
    });
  }
}
