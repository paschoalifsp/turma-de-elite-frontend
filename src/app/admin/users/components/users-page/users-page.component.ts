import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import User from "../../../../shared/model/user";
import {UsersService} from "../../services/users.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  displayedColumns = ['name','email','actions'];

  isLoading = true;
  isChangingPage = false;

  dataSource:MatTableDataSource<User> = new MatTableDataSource<User>();

  totalLength = 0;
  pageSize = 5;

  constructor(private userService: UsersService) {
    this.userService.getAdminUsers(this.pageSize,0).subscribe(response => {
      this.dataSource.data = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  ngOnInit(): void {
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.userService.getAdminUsers(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.dataSource.data = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }
}
