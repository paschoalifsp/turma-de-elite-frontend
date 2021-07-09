import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CustomStateMatcher} from "../../../shared/utils/error-state-matcher";
import {TranslateService} from "@ngx-translate/core"

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

  constructor(
    private authentication: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private translateService: TranslateService,
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
    this.translateService.get('messages.passwordEmailResetSent').subscribe(translation => 
      this.snackbar.open(translation,'OK')
      .afterDismissed()
      .subscribe(value => {
        this.router.navigate(['/login']);
      }))
  }

  invalidEmailMessage(){
    this.translateService.get('fieldErrors.accountNotFound').subscribe(translation =>
      this.snackbar.open(translation, 'Fechar').afterDismissed().subscribe(value => {
        this.router.navigate(['/login']);
      }))
  }
}
