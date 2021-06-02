import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {map} from "rxjs/operators";
import {canActivate} from "@angular/fire/auth-guard";
import {LoginPageComponent} from "./authentication/components/login-page/login-page.component";
import {FirstAccessPageComponent} from "./authentication/components/first-access/first-access-page.component";
import {FirstAccessGuard} from "./authentication/guards/first-access.guard";

const redirectToLoginOrStartPage = () => map( user => user ? ['escolas'] : ['login'])

const routes: Routes = [
  { path: '', component: AppComponent, ...canActivate(redirectToLoginOrStartPage) },
  { path: 'login', component: LoginPageComponent },
  { path: 'primeiro-acesso', component: FirstAccessPageComponent, canActivate: [FirstAccessGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
