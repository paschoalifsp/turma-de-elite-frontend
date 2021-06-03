import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access-page.component.html',
  styleUrls: ['./first-access-page.component.scss']
})
export class FirstAccessPageComponent implements OnInit {

  firstAccessForm = this.fb.group({
    email: ['',Validators.email],
    password: ['', Validators.compose([Validators.minLength(6),Validators.required])]
  })

  isEmailInvalid = false;
  isPasswordInvalid = false;
  isAlreadyRegistered = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.firstAccessForm.valueChanges.subscribe(value => {
      console.log(this.firstAccessForm.get('password')?.errors?.minlength);
    });
  }

  doFirstAccess(){
    this.activatedRoute.queryParams.subscribe(params => {
      const firstAccessToken = params['token'];
      const {email,password} = this.firstAccessForm.value;
      this.auth.doAdminFirstAccess(email,password,firstAccessToken)
        .subscribe(
          value => {},
          error => {},
          );
    });

  }

  showSnackbar(message: string){
    this.snackbar.open(message,'Fechar');
  }

}
