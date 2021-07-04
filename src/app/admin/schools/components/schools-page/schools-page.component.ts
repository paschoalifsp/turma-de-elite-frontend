import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import User from "../../../../shared/model/user";
import {UsersService} from "../../../users/services/users.service";
import {PageEvent} from "@angular/material/paginator";
import {SchoolService} from "../../services/school.service";
import School from "../../../../shared/model/school";

@Component({
  selector: 'app-schools-page',
  templateUrl: './schools-page.component.html',
  styleUrls: ['./schools-page.component.scss']
})
export class SchoolsPageComponent implements OnInit {

  displayedColumns = ['name','identifier','actions'];

  isLoading = true;
  isChangingPage = false;

  dataSource = new MatTableDataSource<School>();

  totalLength = 0;
  pageSize = 5;

  constructor(private schoolService: SchoolService) {
    this.schoolService.getSchools(this.pageSize,0).subscribe(response => {
      this.dataSource.data = response.content;
      this.totalLength = response.totalElements;
      this.isLoading = false;
    })
  }

  ngOnInit(): void {
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.schoolService.getSchools(pageEvent.pageSize,pageEvent.pageIndex).subscribe(response => {
      this.dataSource.data = response.content;
      this.pageSize = pageEvent.pageSize;
      this.totalLength = response.totalElements;
      this.isChangingPage = false;
    })
  }

}
