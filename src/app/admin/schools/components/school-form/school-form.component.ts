import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
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
    alreadyRegisteredIdentifier = false;

  @Input() schoolId:number | null = null;
  @Input() createMode = false;

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
    if(this.schoolId){
      this.isEdit = true;
    }
  }

  ngOnChanges(changes: SimpleChanges){
    this.isEdit = !this.createMode;
    if(this.createMode){
      this.schoolForm.reset();
    }
    else{
      this.schoolService.getSchoolById(this.schoolId as number).subscribe( ({name,identifier,isActive}) => {
        this.schoolForm.setValue({name,identifier,isActive})

      })
    }

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
