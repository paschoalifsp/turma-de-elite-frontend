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
import {DashboardKpiComponent} from "./admin/dashboard-kpi/dashboard-kpi.component";
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
import {AchievementPageComponent} from "./teacher/achievement/components/achievement-page/achievement-page.component";
import {TeacherPageComponent} from "./manager/teacher/components/teacher-page/teacher-page.component";
import {ClassPageComponent} from "./manager/school-classes/components/class-page/class-page.component";
import {StudentsPageComponent} from "./manager/students/components/students-page/students-page.component";
import {TeacherDashboardComponent} from "./teacher/dashboard/components/teacher-dashboard/teacher-dashboard.component";
import {IsTeacherGuard} from "./authentication/guards/is-teacher.guard";
import {TeacherActivitiesPage} from "./teacher/activities/components/activities-page/teacher-activities-page.component";
import {HomeGuard} from "./authentication/guards/home.guard";
import {IsStudentGuard} from "./authentication/guards/is-student.guard";
import {StudentDashboardComponent} from "./student/dashboard/components/dashboard/student-dashboard.component";
import {StudentActivitiesPageComponent} from "./student/activities/components/student-activities/student-activities-page.component";
import {TeacherDeliveriesPageComponent} from "./teacher/grades/components/teacher-deliveries-page/teacher-deliveries-page.component";
import {SchoolClassesComponent} from "./teacher/school-classes/components/school-classes/school-classes.component";
import {AchievementsListPageComponent} from "./student/achievements/components/achievements-list-page/achievements-list-page.component";
import {RankingPageComponent} from "./student/ranking/components/ranking-page/ranking-page.component";
import {ConnectionsPageComponent} from "./manager/connections/components/connections-page/connections-page.component";
import {DashboardEngagementComponent} from "./manager/dashboard-engagement/dashboard-engagement.component"
import { DashboardFollowUpComponent } from './teacher/dashboard-follow-up/dashboard-follow-up.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [HomeGuard] },
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
      { path: 'dash', component: DashboardKpiComponent },
      { path: 'connections', component: ConnectionsPageComponent}
    ]
  },
  {
    path: 'manager',
    component: ToolbarComponent,
    canActivate: [AngularFireAuthGuard, IsManagerGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      { path: 'dashboard', component: ManagerDashboardComponent},
      { path: 'teachers', component: TeacherPageComponent},
      { path: 'classes', component: ClassPageComponent},
      { path: 'students', component: StudentsPageComponent},
      { path: 'dash', component: DashboardEngagementComponent },
      { path: 'connections', component: ConnectionsPageComponent}
    ]
  },
  {
    path: 'teacher',
    component: ToolbarComponent,
    canActivate: [AngularFireAuthGuard, IsTeacherGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      { path: 'dashboard', component: TeacherDashboardComponent},
      { path: 'activities', component: TeacherActivitiesPage},
      { path: 'activities/:id/grades', component: TeacherDeliveriesPageComponent },
      { path: 'achievements', component: AchievementPageComponent},
      { path: 'classes', component: SchoolClassesComponent},
      { path: 'dash', component: DashboardFollowUpComponent },
      { path: 'connections', component: ConnectionsPageComponent}
    ]
  },
  {
    path: 'student',
    component: ToolbarComponent,
    canActivate: [AngularFireAuthGuard, IsStudentGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      { path: 'dashboard', component: StudentDashboardComponent},
      { path: 'activities', component: StudentActivitiesPageComponent},
      { path: 'achievements', component: AchievementsListPageComponent },
      { path: 'ranking', component: RankingPageComponent },
      { path: 'connections', component: ConnectionsPageComponent}
    ]
  },
  // /student/dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
