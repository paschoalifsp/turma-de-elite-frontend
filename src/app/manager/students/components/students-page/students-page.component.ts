import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {TeacherService} from "../../../teacher/services/teacher.service";
import {PageEvent} from "@angular/material/paginator";
import {StudentsService} from "../../services/students.service";

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  teachers:any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  teacherToggleId: number | null = null;

  createMode = true;

  constructor(private studentsService: StudentsService) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh(){
    this.studentsService.getStudents(this.pageSize,0).subscribe(response => {
      this.teachers = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.studentsService.getStudents(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.teachers = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

}
