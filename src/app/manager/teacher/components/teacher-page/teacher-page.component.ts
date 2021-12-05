import { Component, OnInit, SimpleChanges } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {TeacherService} from "../../services/teacher.service";
import { forkJoin, Observable, of } from 'rxjs';
import Teacher from 'src/app/shared/model/teacher';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.scss']
})
export class TeacherPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  localTeachers: any[] = [];
  lmsTeachers: any[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


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
  isFromLms: boolean = false;

  createMode = true;

  constructor(
    private teacherService: TeacherService, 
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver) {
    this.refresh();
  }

  ngOnInit(): void {

    this.teacherForm.get('name')?.valueChanges.subscribe(value => {
      if(!value?.id){
        if (value === ""){
            this.refresh();
        } else {
          this.teacherService.findTeacherByNameSimilarity(value).subscribe (localTeachers => {
            this.localTeachers = localTeachers;
          });

        }
      }
    })
  }

  refresh(){
    this.teacherService.getTeachersUsers(this.pageSize,0).subscribe(response => {
      this.localTeachers = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  loadTeachers(index: number){
    if (index == 0){
      this.teacherService.getTeachersUsers(this.pageSize,0).subscribe(response => {
        this.localTeachers = response.content;
        this.totalLength = response.totalElements;
        this.isLoading = false;
      })
    } else if (index == 1){
      this.teacherService.getExternalTeachers().subscribe(response => {
        this.lmsTeachers = response;
        this.totalLength = response.totalElements;
        this.isLoading = false;
      })   
    }
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.teacherService.getTeachersUsers(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.localTeachers = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

  displayTeacherName(teacher: Teacher){
    return teacher && teacher.name ? teacher.name: '';
  }

}
