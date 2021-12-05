import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {ClassService} from "../../../../manager/school-classes/services/class.service";
import {PageEvent} from "@angular/material/paginator";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-school-classes',
  templateUrl: './school-classes.component.html',
  styleUrls: ['./school-classes.component.scss']
})
export class SchoolClassesComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  classes:any[] = [];
  teacherLocalClasses:any[] = [];
  teacherLmsClasses:any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  classToggleId: number | null = null;
  classToggleExternalId: string | null = null;

  createMode = true;

  clear = false;

  constructor(
    private classService: ClassService,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh(){
    this.classService.getTeacherHimselfClassesPaginated(this.pageSize,0).subscribe(response => {
      this.teacherLocalClasses = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
      })
  }

  loadTeacherClasses(index: number){
    if (index == 0){
      this.classService.getTeacherHimselfClassesPaginated(this.pageSize,0).subscribe(response => {
        this.teacherLocalClasses = response.content;
        this.totalLength = response.totalElements;
        this.isLoading = false;
      })
    } else if (index == 1){
      this.classService.getExternalClassesFromAuthenticatedTeacher().subscribe(response => {
        this.teacherLmsClasses = response;
        this.totalLength = response.totalElements;
        this.isLoading = false;
      })
    }
  }

  setToggleClass(classroom: any){
    this.classToggleExternalId=classroom.externalId;
    this.classToggleId=null;
    this.createMode=false;
    console.log(this.classToggleExternalId);
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.classService.getTeacherHimselfClassesPaginated(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.teacherLocalClasses = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

}
