import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {forkJoin, of} from "rxjs";
import School from "../../../../shared/model/school";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../../../../manager/students/services/students.service";
import {SchoolService} from "../../../../admin/schools/services/school.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {ActivityService} from "../../services/activity.service";
import * as moment from "moment";
import {ClassService} from "../../../../manager/school-classes/services/class.service";
import {SnackbarService} from "../../../../shared/services/snackbar.service";

@Component({
  selector: 'app-activities-form',
  templateUrl: './activities-form.component.html',
  styleUrls: ['./activities-form.component.scss']
})
export class ActivitiesFormComponent implements OnInit {

  isEdit = false;

  @Input() isFromLms: boolean = false;
  @Input() activityId:number | null = null;
  @Input() createMode = true;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  alreadyRegisteredEmail = false;

  file:any = null;

  activityForm = this.fb.group({
    name: ['',Validators.required],
    description: ['',Validators.required],
    schoolClasses: ['',Validators.required],
    punctuation: ['',Validators.required],
    isVisible: [false,Validators.required],
    isActive: [false,Validators.required],
    isDeliverable: [false,Validators.required],
    maxDeliveryDate:['',Validators.required],
    filename: [{value: ''}]
  });

  lmsActivities = [] as any[];
  filteredClasses = [] as any[];
  activities = [] as any[];

  isLoading = false;

  displayClassName = (schoolClass:any) => schoolClass?.name || '' ;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private snackbarService: SnackbarService,
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
      if (this.isFromLms === true){
        this.activityService.getTeacherExternalActivityById(this.activityId as number).subscribe((response) =>{
          console.log(response);
          this.activityForm.setValue({
            name: response.name,
            schoolClasses: [],
            punctuation: response.punctuation,
            description: response.description,
            isVisible: response.isVisible,
            isActive: response.isActive, 
            maxDeliveryDate: [],
            filename: []
          });
        });
      }
      else if (this.isFromLms === false || this.isFromLms == null){
        this.activityService.getTeacherActivityById(this.activityId as number).subscribe(({id,maxDeliveryDate,externalId,classes,...rest}) =>{
          this.activityForm.setValue({
            maxDeliveryDate: moment(maxDeliveryDate),
            schoolClasses: classes.map((c: any) => c.id),
            ...rest
          });
        });
      }
    }
  }

  uploadFile($event:any){
    this.file = $event.target.files[0];
    console.log($event?.target);
    this.activityForm.get('filename')?.setValue(this.file.name);
  }

  updateActivity(){
    this.isLoading = true;
    const {maxDeliveryDate,filename,...rest} = this.activityForm.value;
    const formDataRequestBody = new FormData();
    const jsonRequestBody = {
      maxDeliveryDate: maxDeliveryDate.format('YYYY-MM-DD kk:mm:ss'),
      document: this.file,
      ...rest
    };
    for(let key in jsonRequestBody){
      formDataRequestBody.append(key,jsonRequestBody[key]);
    }
    this.activityService.updateActivity(
      this.activityId,
      formDataRequestBody).subscribe(success => {
      this.snackbarService.showSnack('messages.activityUpdated','labels.close');
      this.isLoading = false;
      this.save.emit();
    }, error => {
      this.isLoading = false;
    });
  }

  createActivity(){
    this.isLoading = true;
    const {maxDeliveryDate,filename,...rest} = this.activityForm.value;
    const formDataRequestBody = new FormData();
    const jsonRequestBody = {
      maxDeliveryDate: maxDeliveryDate.format('YYYY-MM-DD kk:mm:ss'),
      document: this.file,
      ...rest
    };
    for(let key in jsonRequestBody){
      formDataRequestBody.append(key,jsonRequestBody[key]);
    }
    this.activityService.createActivity(formDataRequestBody).subscribe(success => {
      this.snackbarService.showSnack('messages.activityCreated','labels.close');
      this.save.emit();
      this.activityForm.reset();
    }, error => {
      this.isLoading = false;
    });
  }

  downloadAttachment(){
    this.activityService.downloadTeacherAttachment(this.activityId as number).subscribe(response => {
      console.log(response.headers)
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(response.body)
      a.href = objectUrl
      a.download = response.headers.get('filename') || '';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  isExpired(){
    const expireDate = this.activityForm.get('maxDeliveryDate')?.value;
    return moment().isAfter(expireDate);
  }

  closeForm(){
    this.cancel.emit();
  }

}
