import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  isEdit = false;
  userId = null;
  alreadyRegisteredEmail = false;

  userForm = this.fb.group({
    email: ['',Validators.email],
    name: ['',Validators.required]
  });

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UsersService,
    private snackbar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      if(value['id']){
        this.isEdit = true;
        this.userId = value['id'];
      }
    })
  }

  updateUser(){

  }

  createUser(){
    this.isLoading = true;
    this.userService.createNewUser(this.userForm.value).subscribe(success => {
      this.translateService.get('messages.userCreated').subscribe( translation => {
        this.isLoading = false;
        this.snackbar.open(translation,'Fechar');
      })
    }, error => {
      console.log(error);
      this.isLoading = false;
      switch (error.status){
        case 409:
          this.alreadyRegisteredEmail = true;
          break;
      }
    });
  }

}
