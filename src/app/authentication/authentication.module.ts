import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import { LoginPageComponent } from './components/login-page/login-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FirstAccessPageComponent} from "./components/first-access/first-access-page.component";

@NgModule({
  declarations: [
    LoginPageComponent,
    FirstAccessPageComponent
  ],
  imports: [
    MatFormFieldModule,
    SharedModule,
  ]
})
export class AuthenticationModule { }