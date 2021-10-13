import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ManagerService} from "../../../../admin/manager/services/manager.service";
import {PageEvent} from "@angular/material/paginator";
import {ClassService} from "../../services/class.service";
import {concatMap, map} from "rxjs/operators";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styleUrls: ['./class-page.component.scss']
})
export class ClassPageComponent implements OnInit {

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
    forkJoin(
      this.classService.getExternalClasses(),
      this.classService.getPaginatedClasses(this.pageSize,0))
      .subscribe(([externalClasses,ownClasses])=> {
        this.classes = [...externalClasses,...ownClasses.content];
        this.totalLength = ownClasses.totalElements + externalClasses.length;
        this.isLoading = false;
      })
    //TODO: Do exception handling for non authenticated external services call
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.classService.getPaginatedClasses(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.classes = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

}
