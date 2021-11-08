import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access-page.component.html',
  styleUrls: ['./first-access-page.component.scss']
})
export class FirstAccessPageComponent implements OnInit {

  firstAccessForm = this.fb.group({
    confirmPassword: ['',Validators.compose([Validators.minLength(6),Validators.required])],
    password: ['', Validators.compose([Validators.minLength(6),Validators.required])]
  }, { validators: this.checkPasswords})

  isEmailInvalid = false;
  isPasswordInvalid = false;
  isAlreadyRegistered = false;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

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

  checkPasswords(group: FormGroup){
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true, }
  }

  doFirstAccess(){
    this.activatedRoute.queryParams.subscribe(params => {
      const firstAccessToken = params['token'];
      const email = params['email'];
      const {password} = this.firstAccessForm.value;
      this.auth.doAdminFirstAccess(email,password,firstAccessToken)
        .subscribe(
          value => {
            this.showSnackbar('Primeiro acesso realizado com sucesso!').afterDismissed().subscribe(value => {
              this.auth.login(email,password).then(result => {
                this.showSnackbar('Bem-vindo ao Turma de Elite');
              });
            });
          },
          error => {
            this.showSnackbar('Já foi realizado primeiro acesso com este usuário');
          },
        );
    });
  }

  showSnackbar(message: string){
    return this.snackbar.open(message,'Fechar', {
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition
    });
  }

}
