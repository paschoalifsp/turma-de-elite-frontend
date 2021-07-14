import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import User from "../../../../shared/model/user";
import {UsersService} from "../../services/users.service";
import {PageEvent} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  users:any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  toggleForm = false;

   usersToggleId: number | null = null;

  createMode = false;

  constructor(private userService: UsersService) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh(){
    this.userService.getAdminUsers(this.pageSize,0).subscribe(response => {
      this.users = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.userService.getAdminUsers(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.users = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }
}
