import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {ManagerService} from "../../services/manager.service";
import { Observable, of } from 'rxjs';
import Manager from 'src/app/shared/model/manager';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss']
})
export class ManagerPageComponent implements OnInit {

  isLoading = true;
  isChangingPage = false;

  managers:any[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  totalLength = 0;
  pageSize = 5;

  filteredManagers$ = of([] as Manager[]);

  searchControl = new FormControl('');

  

  managerForm = this.fb.group({
    email: ['',Validators.email],
    name: ['',Validators.required],
    school: ['',Validators.required],
    isActive:['']
  });

  managerToggleId: number | null = null;

  createMode = true;

  constructor(
    private managerService: ManagerService, 
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver) {
    this.refresh();
  }

  ngOnInit(): void {

    this.managerForm.get('name')?.valueChanges.subscribe(value => {
      if(!value?.id){
        if (value === ""){
          this.refresh();
        } else {
          this.managerService.findManagerByNameSimilarity(value).subscribe (managers => {
            this.managers = managers;
          }
        );
        }
      }
    })
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

  displayManagerName(manager: Manager){
    return manager && manager.name ? manager.name: '';
  }

}
