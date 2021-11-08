import { Component, OnInit, SimpleChanges } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {TeacherService} from "../../services/teacher.service";
import { forkJoin, Observable, of } from 'rxjs';
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
  lmsTeachers: Observable<any> | undefined;
  localTeachers: Observable<any> | undefined;

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
  isFromLms: any = null;

  createMode = true;

  constructor(private teacherService: TeacherService, private fb: FormBuilder) {
    this.refresh();
  }

  ngOnInit(): void {

    this.teacherForm.get('name')?.valueChanges.subscribe(value => {
      if(!value?.id){
        if (value === ""){
            this.refresh();
        } else {
          this.teacherService.findTeacherByNameSimilarity(value).subscribe (teachers => {
            this.teachers = teachers;
          });

        }
      }
    })
  }

  refresh(){
    try{
    forkJoin(
      this.lmsTeachers = this.teacherService.getExternalTeachers(),
      this.localTeachers = this.teacherService.getTeachersUsers(this.pageSize,0))
      .subscribe(([externalTeachers,ownTeachers])=> {
        this.teachers = [...externalTeachers,...ownTeachers.content];
        this.totalLength = ownTeachers.totalElements + externalTeachers.length;
        this.isLoading = false;
        console.log(this.teachers);
      })
    } catch (e) {
      
    }
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
