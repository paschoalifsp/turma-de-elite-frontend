import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ClassService} from "../../../../manager/school-classes/services/class.service";
import {PageEvent} from "@angular/material/paginator";
import {RankingService} from "../../services/ranking.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss']
})
export class RankingPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  classes:any[] = [];
  lmsClasses: any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  classToggleId: number | null = null;
  classToggleExternalId: string | null = null;

  createMode = true;

  clear = false;

  constructor(
    private rankingService: RankingService,
    private breakpointObserver: BreakpointObserver) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh(){
    this.rankingService.getRankedClasses(this.pageSize,0).subscribe(response => {
      this.classes = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
    this.rankingService.getExternalRankedClasses().subscribe( response => {
      this.lmsClasses = response;
      this.isLoading = false;
    })
  }

  setToggleClass(classroom: any){
    this.classToggleExternalId=classroom.externalId;
    this.classToggleId=null;
    this.createMode=false;
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.rankingService.getRankedClasses(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.classes = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

}
