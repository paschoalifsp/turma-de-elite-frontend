import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { DashboardNavigatorButtonComponent } from './components/dashboard-navigator-button/dashboard-navigator-button.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../app.module";
import {MatStepperModule} from "@angular/material/stepper";
import {NgxMatDatetimePickerModule, NgxMatTimepickerModule} from "@angular-material-components/datetime-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMatMomentModule} from "@angular-material-components/moment-adapter";
import {MatFileUploadModule} from "angular-material-fileupload";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { CountdownToPipe } from './pipes/countdown-to.pipe';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatExpansionModule, MatExpansionPanel} from "@angular/material/expansion";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      defaultLanguage: 'pt'
    }),
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
    MatCheckboxModule,
    MatGridListModule,
    MatExpansionModule
  ],
    exports: [
      CommonModule,
      FormsModule,
      RouterModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatFormFieldModule,
      FlexLayoutModule,
      MatInputModule,
      MatButtonModule,
      MatSnackBarModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatDividerModule,
      MatListModule,
      MatTabsModule,
      MatTableModule,
      MatTooltipModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatSlideToggleModule,
      MatSelectModule,
      MatAutocompleteModule,
      DashboardNavigatorButtonComponent,
      MatStepperModule,
      MatDatepickerModule,
      NgxMatTimepickerModule,
      NgxMatDatetimePickerModule,
      NgxMatMomentModule,
      MatCheckboxModule,
      CountdownToPipe,
      MatGridListModule,
      MatExpansionModule
    ],
  declarations: [
    DashboardNavigatorButtonComponent,
    CountdownToPipe
  ]
})
export class SharedModule { }
