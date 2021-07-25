import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {of} from "rxjs";
import School from "../../../../shared/model/school";
import {ActivatedRoute, Router} from "@angular/router";
import {TeacherService} from "../../../teacher/services/teacher.service";
import {SchoolService} from "../../../../admin/schools/services/school.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {StudentsService} from "../../services/students.service";

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})
export class StudentsFormComponent implements OnInit {


  isEdit = false;

  @Input() teacherId:number | null = null;
  @Input() createMode = true;

  @Output() save = new EventEmitter();

  alreadyRegisteredEmail = false;

  studentForm = this.fb.group({
    email: ['',Validators.email],
    registry: ['',Validators.required],
    name: ['',Validators.required],
    isActive:['']
  });

  filteredSchools$ = of([] as School[]);

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private schoolService: SchoolService,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      if(value['id']){
        this.isEdit = true;
        this.teacherId = value['id'];
        this.studentsService.getStudentById(this.teacherId as number).subscribe(({email,name,isActive,registry})=>{
          this.studentForm.setValue({email,name,isActive,registry});
        });
      }
    })
  }

  ngOnChanges(changes: SimpleChanges){
    this.isEdit = !this.createMode;
    if(this.createMode){
      this.studentForm.reset();
    }
    else{
      this.studentsService.getStudentById(this.teacherId as number).subscribe( ({name,email,isActive,registry}) => {
        this.studentForm.setValue({name,email,isActive,registry})
      })
    }
  }

  updateStudent(){
    this.isLoading = true;
    this.studentsService.updateStudent(this.teacherId,this.studentForm.value).subscribe(success => {
      this.translateService.get('messages.studentUpdated').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.snackbar.open(translation,'Fechar').afterDismissed();
      })
    }, error => {
      this.isLoading = false;
    })
  }

  registerStudent(){
    this.isLoading = true;
    this.studentsService.registerStudent(this.studentForm.value).subscribe(success => {
      this.translateService.get('messages.studentRegistered').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.studentForm.reset();
        this.snackbar.open(translation,'Fechar');
      })
    }, error => {
      this.isLoading = false;
      switch (error.status){
        case 409:
          this.translateService.get('messages.alreadyRegisteredEmail').subscribe(translation => {
            this.snackbar.open(translation, 'Fechar');
          })
          this.alreadyRegisteredEmail = true;
          break;
      }
    });
  }

  showSnackbar(message: string){
    this.snackbar.open(message,'Fechar');
  }

}
