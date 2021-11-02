import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ManagerService} from "../../../../admin/manager/services/manager.service";
import {PageEvent} from "@angular/material/paginator";
import {AchievementsService} from "../../../services/achievements.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-achievement-page',
  templateUrl: './achievement-page.component.html',
  styleUrls: ['./achievement-page.component.scss']
})
export class AchievementPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  achievements:any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  achievementToggleId: number | null = null;

  createMode = true;

  constructor(
    private achievementService: AchievementsService,
    private breakpointObserver: BreakpointObserver) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh(){
    this.achievementService.getAchievements(this.pageSize,0).subscribe(response => {
      this.achievements = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.achievementService.getAchievements(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.achievements = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

}
