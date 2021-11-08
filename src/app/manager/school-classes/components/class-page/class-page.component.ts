import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ManagerService} from "../../../../admin/manager/services/manager.service";
import {PageEvent} from "@angular/material/paginator";
import {ClassService} from "../../services/class.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styleUrls: ['./class-page.component.scss']
})
export class ClassPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  classes:any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  classToggleId: number | null = null;

  createMode = true;

  clear = false;

  constructor(
    private classService: ClassService,
    private breakpointObserver: BreakpointObserver) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh(){
    this.classService.getPaginatedClasses(this.pageSize,0).subscribe(response => {
      this.classes = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
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
