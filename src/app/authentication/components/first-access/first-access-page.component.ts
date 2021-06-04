import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

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
    private activatedRoute: ActivatedRoute,
    private router: Router
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
          value => {
            this.showSnackbar('Primeiro acesso realizado com sucesso!').afterDismissed().subscribe(value => {
              this.router.navigate(['login']);
            });
          },
          error => {
            this.showSnackbar('Já foi realizado primeiro acesso com este usuário');
          },
        );
    });
  }

  showSnackbar(message: string){
    return this.snackbar.open(message,'Fechar');
  }

}
