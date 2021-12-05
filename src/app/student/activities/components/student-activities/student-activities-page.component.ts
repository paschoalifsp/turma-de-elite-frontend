import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivityService} from "../../../../teacher/activities/services/activity.service";
import * as moment from "moment";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-student-activities',
  templateUrl: './student-activities-page.component.html',
  styleUrls: ['./student-activities-page.component.scss']
})
export class StudentActivitiesPageComponent implements OnInit {

  isLoading = false;
  isChangingPage = false;
  isFromLms: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  activities:any[] = [];
  studentLocalActivities:any[] = [];
  studentLmsActivities: any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  activityToggleId: [number,number] = [0,0];

  createMode = true;

  classes = ['MAT-5A','MAT-6A','MAT-7A','MAT-8A','MAT-9A'];
  colors = ['#FFC600','#BCED09','#8338EC','#FCF300','#FF715B','#B5179E','#FB5607','#B5179E']

  constructor(
    private activityService: ActivityService,
    private breakpointObserver: BreakpointObserver) {
    this.refresh();
  }

  ngOnInit(): void {}

  refresh(){
    this.activityService.getStudentActivities().subscribe(response => {
      this.studentLocalActivities = response;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  loadStudentActivities(index: number){
    if (index === 0){
      this.activityService.getStudentActivities().subscribe(response => {
        this.studentLocalActivities = response;
        this.totalLength = response.totalElements;
        this.isLoading = false;
      })
    } else if (index === 1){
      this.activityService.getExternalStudentActivities().subscribe(response => {
        this.studentLmsActivities = response;
        this.totalLength = response.totalElements;
        this.isLoading = false;
      })   
    }
  }

  activityStatus(activity: any){
    const deliveryDate = moment(activity.expireDate);
    const now = moment();
    let diff = deliveryDate.diff(now,'minutes');
    if(diff < 1){
      return 'status-expired';
    } else if (activity.isRevised){
      return 'status-revised';
    } else if(activity.isDelivered){
      return 'status-delivered';
    } else{
      return 'status-to-delivery';
    }
  }

  isExpired(activity: any){
    const deliveryDate = moment(activity.expireDate);
    const now = moment();
    let diff = deliveryDate.diff(now,'minutes');
    return diff < 1;
  }
}
