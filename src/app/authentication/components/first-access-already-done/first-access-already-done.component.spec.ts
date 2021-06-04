import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAccessAlreadyDoneComponent } from './first-access-already-done.component';
import {SharedModule} from "../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../../environments/environment";

describe('FirstAccessAlreadyDoneComponent', () => {
  let component: FirstAccessAlreadyDoneComponent;
  let fixture: ComponentFixture<FirstAccessAlreadyDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        NoopAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [ FirstAccessAlreadyDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstAccessAlreadyDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
