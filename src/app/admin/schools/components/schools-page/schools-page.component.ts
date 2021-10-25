import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {SchoolService} from "../../services/school.service";
import School from "../../../../shared/model/school";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {of} from "rxjs";
import {map, tap} from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-schools-page',
  templateUrl: './schools-page.component.html',
  styleUrls: ['./schools-page.component.scss']
})
export class SchoolsPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;
  showFiller = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  schools: School[] = [];

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

  opening = false;

  filteredSchools$ = of([] as School[]);

  constructor(
    private schoolService: SchoolService, 
    private fb: FormBuilder, 
    private breakpointObserver: BreakpointObserver) { 
    this.refresh();
  }

  ngOnInit(): void {
    
      this.schoolForm.get('name')?.valueChanges.subscribe(value => {
      if(!value?.id){
        // this.filteredSchools$ = this.schoolService.findSchoolByNameSimilarity(value);
        if (value === ""){
          this.refresh();
        } else {
          this.schoolService.findSchoolByNameSimilarity(value).subscribe (schools => {
            this.schools = schools;
          }
        );
        }
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
