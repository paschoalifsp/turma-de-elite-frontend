import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../../users/services/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {SchoolService} from "../../services/school.service";

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.scss']
})
export class SchoolFormComponent implements OnInit {

  isEdit = false;
  schoolId = null;
  alreadyRegisteredIdentifier = false;

  schoolForm = this.fb.group({
    name: ['',Validators.required],
    identifier: ['',Validators.required],
    isActive: ['']
  });

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private snackbar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      if(value['id']){
        this.isEdit = true;
        this.schoolId = value['id'];
      }
    })
  }

  updateSchool(){

  }

  createSchool(){
    this.isLoading = true;
    this.schoolService.createSchool(this.schoolForm.value).subscribe(success => {
      this.translateService.get('messages.schoolCreated').subscribe( translation => {
        this.isLoading = false;
        this.snackbar.open(translation,'Fechar');
      })
    }, error => {
      console.log(error);
      this.isLoading = false;
      switch (error.status){
        case 409:
          this.alreadyRegisteredIdentifier = true;
          break;
      }
    });
  }

}
