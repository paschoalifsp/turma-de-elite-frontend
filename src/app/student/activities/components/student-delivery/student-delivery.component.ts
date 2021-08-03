import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ActivityService} from "../../../../teacher/activities/services/activity.service";
import {SchoolService} from "../../../../admin/schools/services/school.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {ClassService} from "../../../../manager/school-classes/services/class.service";
import * as moment from "moment";
import {StudentDeliveryService} from "../../services/student-delivery.service";

@Component({
  selector: 'app-student-delivery',
  templateUrl: './student-delivery.component.html',
  styleUrls: ['./student-delivery.component.scss']
})
export class StudentDeliveryComponent implements OnInit {

  isEdit = false;

  @Input() activityId:[number,number] = [0,0];
  @Input() createMode = true;

  @Output() save = new EventEmitter();

  isDelivered = false;

  filenameControl = new FormControl('');

  activity:any;

  file:any = null;

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
    private classService: ClassService,
    private studentDeliveryService: StudentDeliveryService
  ) { }

  ngOnInit(): void {
    this.classService.getTeacherHimselfClasses().subscribe(classes => {
      this.filteredClasses = classes;
    });
  }

  ngOnChanges(changes: SimpleChanges){
    this.isEdit = !this.createMode;
    if(this.createMode){
    }
    else{
      this.activityService.getStudentActivityById(this.activityId[0],this.activityId[1]).subscribe(({filename,deliveryFilename,...rest}) =>{
        this.activity = {filename,deliveryFilename,...rest};
        this.filenameControl.setValue(deliveryFilename);
        this.isDelivered = !!deliveryFilename;
      });
    }
  }

  uploadFile($event:any){
    this.file = $event.target.files[0];
    this.filenameControl.setValue(this.file?.name);
  }

  deliveryActivity(){
    this.isLoading = true;
    const formDataRequestBody = new FormData();
    formDataRequestBody.append("document",this.file);
    this.studentDeliveryService.deliveryResolution(this.activityId[0],formDataRequestBody).subscribe(success => {
      this.translateService.get('messages.activityDelivered').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.isDelivered = true;
        this.snackbar.open(translation,'Fechar');
      })
    }, error => {
      this.isLoading = false;
    });
  }

  downloadDelivery() {
    this.studentDeliveryService.downloadDeliveryAttachment(this.activityId[0] as number).subscribe(response => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(response.body)
      a.href = objectUrl
      a.download = response.headers.get('filename') || '';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  downloadAttachment(){
    this.activityService.downloadStudentAttachment(this.activityId[0] as number).subscribe(response => {
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
