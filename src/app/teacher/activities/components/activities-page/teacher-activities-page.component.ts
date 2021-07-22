import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {StudentsService} from "../../../../manager/students/services/students.service";
import {PageEvent} from "@angular/material/paginator";
import {ActivityService} from "../../services/activity.service";

@Component({
  selector: 'app-activities-page',
  templateUrl: './teacher-activities-page.component.html',
  styleUrls: ['./teacher-activities-page.component.scss']
})
export class TeacherActivitiesPage implements OnInit {

  isLoading = false;
  isChangingPage = false;

  activities:any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  activityToggleId: number | null = null;

  createMode = true;

  classes = ['MAT-5A','MAT-6A','MAT-7A','MAT-8A','MAT-9A'];
  colors = ['#FFC600','#BCED09','#8338EC','#FCF300','#FF715B','#B5179E','#FB5607','#B5179E']

  constructor(private activityService: ActivityService) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh(){
    this.activityService.getTeacherActivities(this.pageSize,0).subscribe(response => {
      this.activities = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.activityService.getTeacherActivities(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.activities = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }
}
