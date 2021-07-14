import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UsersService} from "../../../users/services/users.service";
import {PageEvent} from "@angular/material/paginator";
import {ManagerService} from "../../services/manager.service";
import { of } from 'rxjs';
import Manager from 'src/app/shared/model/manager';

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

  constructor(private managerService: ManagerService, private fb: FormBuilder) {
    this.refresh();
  }

  ngOnInit(): void {

    this.managerForm.get('name')?.valueChanges.subscribe(value => {
      if(!value?.id && value?.length > 0){
        this.filteredManagers$ = this.managerService.findManagerByNameSimilarity(value);
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
