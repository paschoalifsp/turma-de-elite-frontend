import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {ActivityService} from "../../services/activity.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-activities-page',
  templateUrl: './teacher-activities-page.component.html',
  styleUrls: ['./teacher-activities-page.component.scss']
})
export class TeacherActivitiesPage implements OnInit {

  isLoading = false;
  isChangingPage = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  activities:any[] = [];
  teacherLocalActivities:any[] = [];
  teacherLmsActivities: any[] = [];
  isFromLms: boolean = false;

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  activityToggleId: number | null = null;

  createMode = true;

  classes = ['MAT-5A','MAT-6A','MAT-7A','MAT-8A','MAT-9A'];
  colors = ['#FFC600','#BCED09','#8338EC','#FCF300','#FF715B','#B5179E','#FB5607','#B5179E']

  constructor(
    private activityService: ActivityService,
    private breakpointObserver: BreakpointObserver) {
    this.refresh();
  }

  ngOnInit(): void {
    this.activityService.getPaginatedActivities(this.pageSize,0).subscribe(response => {
      this.teacherLocalActivities = response;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  refresh(){
    this.activityService.getPaginatedActivities(this.pageSize,0).subscribe(response => {
      this.teacherLocalActivities = response;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  loadTeacherActivities(index: number){
    if (index == 0){
      this.activityService.getPaginatedActivities(this.pageSize,0).subscribe(response => {
        this.teacherLocalActivities = response;
        this.totalLength = response.totalElements;
        this.isLoading = false;
      })
    } else if (index == 1){
      this.activityService.getTeacherExternalActivities().subscribe(response => {
        this.teacherLmsActivities = response;
        this.totalLength = response.totalElements;
        this.isLoading = false;
      })   
    }
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.activityService.getTeacherActivitiesPaginated(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.teacherLocalActivities = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }
}
