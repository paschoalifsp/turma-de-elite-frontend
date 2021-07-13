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
import {ToolbarComponent} from "./admin/main-component/toolbar.component";
import {ConfigurationComponent} from "./admin/configuration/components/configuration.component";
import {UsersPageComponent} from "./admin/users/components/users-page/users-page.component";
import {UserFormComponent} from "./admin/users/components/user-form/user-form.component";
import {SchoolsPageComponent} from "./admin/schools/components/schools-page/schools-page.component";
import {SchoolFormComponent} from "./admin/schools/components/school-form/school-form.component";
import { CreateNewPasswordComponent } from './authentication/components/create-new-password/create-new-password.component';
import {ManagerPageComponent} from "./admin/manager/components/manager-page/manager-page.component";
import {IsManagerGuard} from "./authentication/guards/is-manager.guard";
import {ManagerDashboardComponent} from "./manager/dashboard/components/manager-dashboard/manager-dashboard.component";
import {AchievementPageComponent} from "./manager/achievement/components/achievement-page/achievement-page.component";
import {TeacherPageComponent} from "./manager/teacher/components/teacher-page/teacher-page.component";
import {ClassPageComponent} from "./manager/class/components/class-page/class-page.component";
import {StudentsPageComponent} from "./manager/students/components/students-page/students-page.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'first-access', component: FirstAccessPageComponent, canActivate: [FirstAccessGuard] },
  { path: 'first-access/already-done', component: FirstAccessAlreadyDoneComponent },
  { path: 'create-new-password', component: CreateNewPasswordComponent},
  {
    path: 'admin',
    component: ToolbarComponent,
    canActivate: [AngularFireAuthGuard, IsAdminGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      { path: 'dashboard', component: AdminDashboardComponent},
      { path: 'schools', component: SchoolsPageComponent},
      { path: 'configuration', component: ConfigurationComponent},
      { path: 'admins', component: UsersPageComponent},
      { path: 'managers', component: ManagerPageComponent },
    ]
  },
  {
    path: 'manager',
    component: ToolbarComponent,
    canActivate: [AngularFireAuthGuard, IsManagerGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      { path: 'dashboard', component: ManagerDashboardComponent},
      { path: 'achievements', component: AchievementPageComponent},
      { path: 'teachers', component: TeacherPageComponent},
      { path: 'classes', component: ClassPageComponent},
      { path: 'students', component: StudentsPageComponent},

    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
