import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {of} from "rxjs";
import School from "../../../../shared/model/school";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../../../../manager/students/services/students.service";
import {SchoolService} from "../../../../admin/schools/services/school.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-activities-form',
  templateUrl: './activities-form.component.html',
  styleUrls: ['./activities-form.component.scss']
})
export class ActivitiesFormComponent implements OnInit {

  isEdit = false;

  @Input() activityId:number | null = null;
  @Input() createMode = true;

  @Output() save = new EventEmitter();

  alreadyRegisteredEmail = false;

  studentForm = this.fb.group({
    name: ['',Validators.required],
    description: ['',Validators.required],
    class: ['',Validators.required],
    punctuation: ['',Validators.required],
    isVisible: [true,Validators.required],
    isActive: [true,Validators.required],
    maxDeliveryDate:['',Validators.required],
  });

  filteredClasses = [] as any[];

  isLoading = false;

  displayClassName = (schoolClass:any) => schoolClass?.name || '' ;

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
        this.activityId = value['id'];
        this.studentsService.getStudentById(this.activityId as number).subscribe(({email,name,isActive,registry})=>{
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
      this.studentsService.getStudentById(this.activityId as number).subscribe( ({name,email,isActive,registry}) => {
        this.studentForm.setValue({name,email,isActive,registry})
      })
    }
  }

  updateTeacher(){
    this.isLoading = true;
    this.studentsService.updateStudent(this.activityId,this.studentForm.value).subscribe(success => {
      this.translateService.get('messages.studentUpdated').subscribe( translation => {
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
          this.alreadyRegisteredEmail = true;
          break;
      }
    });
  }

  showSnackbar(message: string){
    this.snackbar.open(message,'Fechar');
  }

}
