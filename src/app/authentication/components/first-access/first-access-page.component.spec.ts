import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAccessPageComponent } from './first-access-page.component';

describe('FirstAccessComponent', () => {
  let component: FirstAccessPageComponent;
  let fixture: ComponentFixture<FirstAccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstAccessPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstAccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
