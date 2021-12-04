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

  localClasses:any[] = [];
  lmsClasses:any[] = [];

  isFromLms: boolean = false;

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
    this.classService.getPaginatedClasses(this.pageSize,0).subscribe(response => {
      this.localClasses = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
    //TODO: Do exception handling for non authenticated external services call
  }

  loadClasses(index: number){
    if (index == 0){
      this.classService.getPaginatedClasses(this.pageSize,0).subscribe(response => {
        this.localClasses = response.content;
        this.totalLength = response.totalElements;
        this.isLoading = false;
      })
    } else if (index == 1){
      this.classService.getExternalClasses().subscribe(response => {
        this.lmsClasses = response;
        this.totalLength = response.totalElements;
        this.isLoading = false;
      })     
    }
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.classService.getPaginatedClasses(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.localClasses = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

}
