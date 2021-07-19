import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ManagerService} from "../../../../admin/manager/services/manager.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-achievement-page',
  templateUrl: './achievement-page.component.html',
  styleUrls: ['./achievement-page.component.scss']
})
export class AchievementPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  achievements:any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  achievementToggleId: number | null = null;

  createMode = true;

  constructor(private managerService: ManagerService) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh(){
    this.managerService.getManagersUsers(this.pageSize,0).subscribe(response => {
      this.achievements = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.managerService.getManagersUsers(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.achievements = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

}
