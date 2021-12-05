import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {BearerInterceptor} from "./authentication/interceptor/bearer.interceptor";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireAuthGuardModule} from "@angular/fire/auth-guard";
import {AuthenticationModule} from "./authentication/authentication.module";
import {SharedModule} from "./shared/shared.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {registerLocaleData} from "@angular/common";
import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/es-US';
import { AdminDashboardComponent } from './admin/dashboard/components/admin-dashboard/admin-dashboard.component';
import { ToolbarComponent } from './admin/main-component/toolbar.component';
import { ConfigurationComponent } from './admin/configuration/components/configuration.component';
import { UsersPageComponent } from './admin/users/components/users-page/users-page.component';
import { UserFormComponent } from './admin/users/components/user-form/user-form.component';
import { SchoolsPageComponent } from './admin/schools/components/schools-page/schools-page.component';
import { SchoolFormComponent } from './admin/schools/components/school-form/school-form.component';
import { ManagerPageComponent } from './admin/manager/components/manager-page/manager-page.component';
import { ManagerFormComponent } from './admin/manager/components/manager-form/manager-form.component';
import { ManagerDashboardComponent } from './manager/dashboard/components/manager-dashboard/manager-dashboard.component';
import { AchievementPageComponent } from './teacher/achievement/components/achievement-page/achievement-page.component';
import { AchievementFormComponent } from './teacher/achievement/components/achievement-form/achievement-form.component';
import { TeacherPageComponent } from './manager/teacher/components/teacher-page/teacher-page.component';
import { TeacherFormComponent } from './manager/teacher/components/teacher-form/teacher-form.component';
import { HttpClientModule } from "@angular/common/http";
import { ClassPageComponent } from './manager/school-classes/components/class-page/class-page.component';
import { ClassFormComponent } from './manager/school-classes/components/class-form/class-form.component';
import { StudentsPageComponent } from './manager/students/components/students-page/students-page.component';
import { StudentsFormComponent } from './manager/students/components/students-form/students-form.component';
import { TeacherTableComponent } from './manager/school-classes/components/teacher-table/teacher-table.component';
import { StudentTableComponent } from './manager/school-classes/components/student-table/student-table.component';
import { TeacherDashboardComponent } from './teacher/dashboard/components/teacher-dashboard/teacher-dashboard.component';
import { ActivitiesFormComponent } from './teacher/activities/components/activities-form/activities-form.component';
import { StudentDashboardComponent } from './student/dashboard/components/dashboard/student-dashboard.component';
import { TeacherActivitiesPage } from './teacher/activities/components/activities-page/teacher-activities-page.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { StudentActivitiesPageComponent } from './student/activities/components/student-activities/student-activities-page.component';
import { StudentDeliveryComponent } from './student/activities/components/student-delivery/student-delivery.component';
import { TeacherDeliveriesPageComponent } from './teacher/grades/components/teacher-deliveries-page/teacher-deliveries-page.component';
import { SchoolClassesComponent } from './teacher/school-classes/components/school-classes/school-classes.component';
import { SchoolDetailsComponent } from './teacher/school-classes/components/school-details/school-details.component';
import { AchievementsListPageComponent } from './student/achievements/components/achievements-list-page/achievements-list-page.component';
import { RankingPageComponent } from './student/ranking/components/ranking-page/ranking-page.component';
import { RankingDetailsComponent } from './student/ranking/components/ranking-details/ranking-details.component';
import { DashboardKpiComponent } from './admin/dashboard-kpi/dashboard-kpi.component';
import { MatIconModule } from '@angular/material/icon';

import { ChartsModule } from 'ng2-charts';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatExpansionModule} from '@angular/material/expansion';
import { ConnectionsPageComponent } from './manager/connections/components/connections-page/connections-page.component';
import { DashboardFollowUpComponent } from './teacher/dashboard-follow-up/dashboard-follow-up.component';
import { DashboardEngagementComponent } from './manager/dashboard-engagement/dashboard-engagement.component';

registerLocaleData(localePt);
registerLocaleData(localeEn);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    ToolbarComponent,
    ConfigurationComponent,
    UsersPageComponent,
    UserFormComponent,
    SchoolsPageComponent,
    SchoolFormComponent,
    ManagerPageComponent,
    ManagerFormComponent,
    ManagerDashboardComponent,
    AchievementPageComponent,
    AchievementFormComponent,
    TeacherPageComponent,
    TeacherFormComponent,
    ClassPageComponent,
    ClassFormComponent,
    StudentsPageComponent,
    StudentsFormComponent,
    TeacherTableComponent,
    StudentTableComponent,
    TeacherDashboardComponent,
    ActivitiesFormComponent,
    StudentDashboardComponent,
    StudentActivitiesPageComponent,
    StudentDeliveryComponent,
    TeacherDeliveriesPageComponent,
    SchoolClassesComponent,
    SchoolDetailsComponent,
    TeacherActivitiesPage,
    AchievementsListPageComponent,
    RankingPageComponent,
    RankingDetailsComponent,
    DashboardKpiComponent,
    ConnectionsPageComponent,
    DashboardFollowUpComponent,
    DashboardEngagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AuthenticationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatExpansionModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      defaultLanguage: 'pt'
    }),
    SharedModule,
    ChartsModule,
    MatIconModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true},
    { provide: LOCALE_ID, useValue: 'pt'},
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
