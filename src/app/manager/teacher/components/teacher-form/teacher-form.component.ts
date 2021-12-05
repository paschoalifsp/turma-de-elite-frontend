import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {of} from "rxjs";
import School from "../../../../shared/model/school";
import {ActivatedRoute} from "@angular/router";
import {SchoolService} from "../../../../admin/schools/services/school.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {TeacherService} from "../../services/teacher.service";


@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit {

  isEdit = false;

  @Input() teacherId:number | null = null;
  @Input() createMode = true;
  @Input() isFromLms: boolean = false;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  alreadyRegisteredEmail = false;

  teacherForm = this.fb.group({
    email: ['',Validators.email],
    name: ['',Validators.required],
    isActive:['']
  });

  isLoading = false;
  filteredSchools$ = of([] as School[]);
  
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private schoolService: SchoolService,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.teacherForm.get('school')?.valueChanges.subscribe(value => {
      if(!value?.id && value !== ""){
        this.filteredSchools$ = this.schoolService.findSchoolByNameSimilarity(value);
      }
    })
    this.route.params.subscribe(value => {
      if(value['id']){
        
        if(this.isFromLms === true) {
          this.isEdit = true;
          this.teacherService.getTeacherByExternalId(this.teacherId as number).subscribe(({email,name,isActive}) => {
            this.teacherForm.setValue({email, name, isActive});
          });
        }
        else if (this.isFromLms === false || this.isFromLms === null) {
          this.isEdit = true;
          this.teacherId = value['id'];
          this.teacherService.getTeacherById(this.teacherId as number).subscribe(({email,name,isActive})=>{
            this.teacherForm.setValue({email,name,isActive});
          });
        }

      }
    })
  }

  ngOnChanges(changes: SimpleChanges){
    this.isEdit = !this.createMode;
    if(this.createMode){
      this.teacherForm.reset();
    }
    else{

      if(this.isFromLms === true) {
        this.teacherService.getTeacherByExternalId(this.teacherId as number).subscribe( ({name,email,isActive}) => {
          this.teacherForm.setValue({name,email,isActive})
        })
      }
      else if (this.isFromLms === false || this.isFromLms === null) {
        this.teacherService.getTeacherById(this.teacherId as number).subscribe( ({name,email,isActive}) => {
          this.teacherForm.setValue({name,email,isActive})
        })
      }
    }
  }

  updateTeacher(){
    this.isLoading = true;
    this.teacherService.updateTeacher(this.teacherId,this.teacherForm.value).subscribe(success => {
      this.translateService.get('messages.teacherUpdated').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.snackbar.open(translation,'Fechar').afterDismissed();
      })
    }, error => {
      this.isLoading = false;
    })
  }

  registerTeacher(){
    this.isLoading = true;
    this.teacherService.registerTeacher(this.teacherForm.value).subscribe(success => {
      this.translateService.get('messages.teacherCreated').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.teacherForm.reset();
        this.snackbar.open(translation,'Fechar');
      })
    }, error => {
      this.isLoading = false;
      switch (error.status){
        case 409:
          this.translateService.get('messages.alreadyRegisteredIdentifier').subscribe(translation => {
            this.snackbar.open(translation, 'Fechar');
          })
          this.alreadyRegisteredEmail = true;
          break;
      }
    });
  }

  displaySchoolName(school: School){
    return school && school.name ? school.name: '';
  }

  showSnackbar(message: string){
    this.snackbar.open(message,'Fechar');
  }

  
  closeForm(){
    this.cancel.emit();
  }

}
