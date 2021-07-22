import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDeliveriesPageComponent } from './teacher-deliveries-page.component';

describe('TeacherDeliveriesPageComponent', () => {
  let component: TeacherDeliveriesPageComponent;
  let fixture: ComponentFixture<TeacherDeliveriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDeliveriesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDeliveriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
