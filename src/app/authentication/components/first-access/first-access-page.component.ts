import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access-page.component.html',
  styleUrls: ['./first-access-page.component.scss']
})
export class FirstAccessPageComponent implements OnInit {

  firstAccessForm = this.fb.group({
    email: ['',Validators.email],
    password: ['', Validators.required]
  })

  isEmailInvalid = false;
  isPasswordInvalid = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  doFirstAccess(){
    const {email,password} = this.firstAccessForm.value;
    this.auth.login(email,password)
      .then( user => {
        console.log(user);
        this.auth.doAdminFirstAccess(email).subscribe(console.log);
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

}
