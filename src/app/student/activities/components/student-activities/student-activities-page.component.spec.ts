import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentActivitiesPageComponent } from './student-activities-page.component';

describe('StudentActivitiesComponent', () => {
  let component: StudentActivitiesPageComponent;
  let fixture: ComponentFixture<StudentActivitiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentActivitiesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentActivitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
