import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {map} from "rxjs/operators";
import {AngularFireAuthGuard, canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {LoginPageComponent} from "./authentication/components/login-page/login-page.component";
import {FirstAccessPageComponent} from "./authentication/components/first-access/first-access-page.component";
import {FirstAccessGuard} from "./authentication/guards/first-access.guard";
import {FirstAccessAlreadyDoneComponent} from "./authentication/components/first-access-already-done/first-access-already-done.component";
import {ResetPasswordComponent} from "./authentication/components/reset-password/reset-password.component";
import {AdminDashboardComponent} from "./admin/dashboard/components/admin-dashboard/admin-dashboard.component";
import {IsAdminGuard} from "./authentication/guards/is-admin.guard"
import {AdminMainComponent} from "./admin/main-component/admin-main.component";
import {ConfigurationComponent} from "./admin/configuration/components/configuration.component";
import {UsersPageComponent} from "./admin/users/components/users-page/users-page.component";
import {UserFormComponent} from "./admin/users/components/user-form/user-form.component";
import {SchoolsPageComponent} from "./admin/schools/components/schools-page/schools-page.component";
import {SchoolFormComponent} from "./admin/schools/components/school-form/school-form.component";


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'first-access', component: FirstAccessPageComponent, canActivate: [FirstAccessGuard] },
  { path: 'first-access/already-done', component: FirstAccessAlreadyDoneComponent },

  {
    path: 'admin',
    component: AdminMainComponent,
    canActivate: [AngularFireAuthGuard, IsAdminGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      { path: 'dashboard', component: AdminDashboardComponent},
      { path: 'schools', component: SchoolsPageComponent},
      { path: 'schools/form', component: SchoolFormComponent},
      { path: 'configuration', component: ConfigurationComponent},
      { path: 'admins', component: UsersPageComponent},
      { path: 'admins/form/:id', component: UserFormComponent},
      { path: 'admins/form', component: UserFormComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
