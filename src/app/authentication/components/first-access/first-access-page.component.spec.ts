import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAccessPageComponent } from './first-access-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DebugElement} from "@angular/core";

describe('FirstAccessComponent', () => {
  let component: FirstAccessPageComponent;
  let fixture: ComponentFixture<FirstAccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        NoopAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [ FirstAccessPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstAccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuir um botão escrito \"Realizar primeiro acesso\"', () => {
    const componentDebugElement: HTMLElement = fixture.nativeElement;
    const button = componentDebugElement.querySelector('button');
    expect(button?.textContent).toBe(' Realizar primeiro acesso ');
  });
});
