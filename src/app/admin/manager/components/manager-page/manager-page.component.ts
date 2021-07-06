import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {UsersService} from "../../../users/services/users.service";
import {PageEvent} from "@angular/material/paginator";
import {ManagerService} from "../../services/manager.service";

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss']
})
export class ManagerPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  managers:any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  managerToggleId: number | null = null;

  createMode = true;

  constructor(private managerService: ManagerService) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh(){
    this.managerService.getManagersUsers(this.pageSize,0).subscribe(response => {
      this.managers = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.managerService.getManagersUsers(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.managers = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

}
