import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ClassService} from "../../../../manager/school-classes/services/class.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-school-classes',
  templateUrl: './school-classes.component.html',
  styleUrls: ['./school-classes.component.scss']
})
export class SchoolClassesComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  classes:any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  classToggleId: number | null = null;

  createMode = true;

  clear = false;


  constructor(private classService: ClassService) {
    this.refresh();
  }

  ngOnInit(): void {

  }

  refresh(){
    this.classService.getTeacherHimselfClassesPaginated(this.pageSize,0).subscribe(response => {
      this.classes = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.classService.getTeacherHimselfClassesPaginated(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.classes = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

}
