import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherActivitiesPage } from './teacher-activities-page.component';

describe('ActivitiesPageComponent', () => {
  let component: TeacherActivitiesPage;
  let fixture: ComponentFixture<TeacherActivitiesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherActivitiesPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherActivitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
