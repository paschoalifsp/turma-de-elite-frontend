import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {TeacherService} from "../../services/teacher.service";
import { of } from 'rxjs';
import Teacher from 'src/app/shared/model/teacher';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.scss']
})
export class TeacherPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  teachers: any[] = [];

  totalLength = 0;
  pageSize = 5;

  teacherForm = this.fb.group({
    email: ['',Validators.email],
    name: ['',Validators.required],
    school: ['', Validators.required],
    isActive:['']
  });

  searchControl = new FormControl('');

  filteredTeachers$ = of([] as Teacher[]);

  teacherToggleId: number | null = null;

  createMode = true;

  constructor(private teacherService: TeacherService, private fb: FormBuilder) {
    this.refresh();
  }

  ngOnInit(): void {

    this.teacherForm.get('name')?.valueChanges.subscribe(value => {
      if(!value?.id){
        // this.filteredSchools$ = this.schoolService.findSchoolByNameSimilarity(value);
        if (value === ""){
          this.refresh();
        } else {
          this.teacherService.findTeacherByNameSimilarity(value).subscribe (teachers => {
            this.teachers = teachers;
          }
        );
        }
      }
    })

  }

  refresh(){
    this.teacherService.getTeachersUsers(this.pageSize,0).subscribe(response => {
      this.teachers = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.teacherService.getTeachersUsers(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.teachers = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

  displayTeacherName(teacher: Teacher){
    return teacher && teacher.name ? teacher.name: '';
  }


}
