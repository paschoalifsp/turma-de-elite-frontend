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

  file:any = null;

  activityForm = this.fb.group({
    name: ['',Validators.required],
    description: ['',Validators.required],
    schoolClasses: ['',Validators.required],
    punctuation: ['',Validators.required],
    isVisible: [false,Validators.required],
    isActive: [false,Validators.required],
    isDeliverable: [false, Validators.required],
    maxDeliveryDate:['',Validators.required],
    filename: [{value: ''}]
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
      this.activityService.getActivityById(this.activityId as number).subscribe(({id,maxDeliveryDate,classes,...rest}) =>{
        this.activityForm.setValue({
          maxDeliveryDate: moment(maxDeliveryDate),
          schoolClasses: classes.map((c: any) => c.id),
          ...rest
        });
      });
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
      this.translateService.get('messages.studentRegistered').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.snackbar.open(translation,'Fechar');
      })
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

  downloadAttachment(){
    this.activityService.downloadAttachment(this.activityId as number).subscribe( response => {
      console.log(response.headers)
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(response.body)
      a.href = objectUrl
      a.download = response.headers.get('filename') || '';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  showSnackbar(message: string){
    this.snackbar.open(message,'Fechar');
  }

}
