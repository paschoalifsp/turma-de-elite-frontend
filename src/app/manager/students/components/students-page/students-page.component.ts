import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {StudentsService} from "../../services/students.service";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  students:any[] = [];

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
    forkJoin(
      this.studentsService.getExternalStudents(),
      this.studentsService.getStudentsUsers(this.pageSize,0))
      .subscribe(([externalStudents,ownStudents])=> {
        this.students = [...externalStudents,...ownStudents.content];
        this.totalLength = ownStudents.totalElements + externalStudents.length;
        this.isLoading = false;
      })
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.studentsService.getStudents(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.students = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

}
