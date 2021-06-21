import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router
    ) { }

  login(){
    const {email,password} = this.loginForm.value;
    this.auth.login(email,password)
      .then( result => {
        this.auth.getRole().subscribe(role => this.redirectAccordingToRole(role));
      })
      .catch(error => {
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
      });
  }

  showSnackbar(message: string){
    this.snackbar.open(message,'Fechar');
  }

  private redirectAccordingToRole(role: string){
    switch (role){
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'STUDENT':
        break;
      case 'TEACHER':
        break;
      case 'MANAGER':
        break;

    }
  }

}
