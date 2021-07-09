import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ManagerService} from "../../../../admin/manager/services/manager.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.scss']
})
export class TeacherPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  teachers:any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  teacherToggleId: number | null = null;

  createMode = true;

  constructor(private managerService: ManagerService) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh(){
    this.managerService.getManagersUsers(this.pageSize,0).subscribe(response => {
      this.teachers = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.managerService.getManagersUsers(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.teachers = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }


}
