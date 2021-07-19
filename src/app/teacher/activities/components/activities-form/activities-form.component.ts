import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {of} from "rxjs";
import School from "../../../../shared/model/school";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../../../../manager/students/services/students.service";
import {SchoolService} from "../../../../admin/schools/services/school.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {ActivityService} from "../../services/activity.service";
import * as moment from "moment";
import {ClassService} from "../../../../manager/class/services/class.service";

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

  activityForm = this.fb.group({
    name: ['',Validators.required],
    description: ['',Validators.required],
    schoolClasses: ['',Validators.required],
    punctuation: ['',Validators.required],
    isVisible: [true,Validators.required],
    isActive: [true,Validators.required],
    isDeliverable: [true, Validators.required],
    maxDeliveryDate:['',Validators.required],
  });

  filteredClasses = [] as any[];

  isLoading = false;

  displayClassName = (schoolClass:any) => schoolClass?.name || '' ;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private activityService: ActivityService,
    private schoolService: SchoolService,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    private classService: ClassService
  ) { }

  ngOnInit(): void {
    this.classService.getTeacherHimselfClasses().subscribe(classes => {
      this.filteredClasses = classes;
    });
  }

  ngOnChanges(changes: SimpleChanges){
    this.isEdit = !this.createMode;
    if(this.createMode){
      this.activityForm.reset();
    }
    else{
      this.activityService.getActivityById(this.activityId as number).subscribe(({id,maxDeliveryDate, ...rest}) =>{
        this.activityForm.setValue({maxDeliveryDate: moment(maxDeliveryDate),...rest});
      });
    }
  }

  updateActivity(){
    this.isLoading = true;
    const {maxDeliveryDate,...rest} = this.activityForm.value;
    this.activityService.updateActivity(
      this.activityId,
      {maxDeliveryDate: maxDeliveryDate.format('YYYY-MM-DD kk:mm:ss'),...rest}).subscribe(success => {
      this.translateService.get('messages.studentRegistered').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.activityForm.reset();
        this.snackbar.open(translation,'Fechar');
      })
    }, error => {
      this.isLoading = false;
    });
  }

  createActivity(){
    this.isLoading = true;
    const {maxDeliveryDate,...rest} = this.activityForm.value;
    this.activityService.createActivity({maxDeliveryDate: maxDeliveryDate.format('YYYY-MM-DD kk:mm:ss'),...rest}).subscribe(success => {
      this.translateService.get('messages.studentRegistered').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.activityForm.reset();
        this.snackbar.open(translation,'Fechar');
      })
    }, error => {
      this.isLoading = false;
    });
  }

  showSnackbar(message: string){
    this.snackbar.open(message,'Fechar');
  }

}
