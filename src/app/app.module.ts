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
import { AchievementPageComponent } from './manager/achievement/components/achievement-page/achievement-page.component';
import { AchievementFormComponent } from './manager/achievement/components/achievement-form/achievement-form.component';
import { TeacherPageComponent } from './manager/teacher/components/teacher-page/teacher-page.component';
import { TeacherFormComponent } from './manager/teacher/components/teacher-form/teacher-form.component';
import { HttpClientModule } from "@angular/common/http";


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
    TeacherFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AuthenticationModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      defaultLanguage: 'pt'
    }),
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true},
    { provide: LOCALE_ID, useValue: 'pt'},
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
