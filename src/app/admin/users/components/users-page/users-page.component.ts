import { Component, OnInit } from '@angular/core';
import User from "../../../../shared/model/user";
import {UsersService} from "../../services/users.service";
import {PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { Observable, of } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

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

  userForm = this.fb.group({
    email: ['',Validators.email],
    name: ['',Validators.required],
    isActive:['']
  });

  searchControl = new FormControl('');

  toggleForm = false;

  usersToggleId: number | null = null;

  filteredUsers$ = of([] as User[]);

  createMode = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  constructor
  (private userService: UsersService, 
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver) {
    this.refresh();
  }

  ngOnInit(): void {

    this.userForm.get('name')?.valueChanges.subscribe(value => {
      if(!value?.id){
        // this.filteredSchools$ = this.schoolService.findSchoolByNameSimilarity(value);
        if (value === ""){
          this.refresh();
        } else {
          this.userService.findUserByNameSimilarity(value).subscribe (users => {
            this.users = users;
          }
        );
        }
      }
    })

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

  
  displayUserName(user: User){
    return user && user.name ? user.name: '';
  }

}