import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import User from "../../../../shared/model/user";
import {UsersService} from "../../../users/services/users.service";
import {PageEvent} from "@angular/material/paginator";
import {SchoolService} from "../../services/school.service";
import School from "../../../../shared/model/school";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {of} from "rxjs";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-schools-page',
  templateUrl: './schools-page.component.html',
  styleUrls: ['./schools-page.component.scss']
})
export class SchoolsPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  schools:any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  schoolForm = this.fb.group({
    name: ['',Validators.required],
    identifier: ['',Validators.required],
    isActive: ['']
  });

  toggleForm = false;

  schoolToggleId: number | null = null;

  createMode = false;

  filteredSchools$ = of([] as School[]);

  constructor(private schoolService: SchoolService, private fb: FormBuilder) { 
    this.refresh();
  }

  ngOnInit(): void {
    
    this.schoolForm.get('name')?.valueChanges.subscribe(value => {
      if(!value?.id && value?.length > 0){
        this.filteredSchools$ = this.schoolService.findSchoolByNameSimilarity(value);
      }
    })

    this.refresh();

  }

  refresh(){
    this.schoolService.getSchools(this.pageSize,0)
      .pipe(
        tap(response => {
          this.totalLength = response.totalElements;
          this.isLoading = false;
        }),
        map(response => response.content)
      ).subscribe( response => {
      this.schools = response;
    })
  }

  pageChange(pageEvent: PageEvent) {
    this.isChangingPage = true;
    this.schoolService.getSchools(this.pageSize,pageEvent.pageIndex)
      .pipe(
        tap(response => {
          this.totalLength = response.totalElements;
          this.isChangingPage = false;
        }),
        map(response => response.content)
      ).subscribe(response => {
        this.schools = response;
    })
  }

  displaySchoolName(school: School){
    return school && school.name ? school.name: '';
  }

}
