import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavigatorButtonComponent } from './dashboard-navigator-button.component';

describe('DashboardNavigatorButtonComponent', () => {
  let component: DashboardNavigatorButtonComponent;
  let fixture: ComponentFixture<DashboardNavigatorButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardNavigatorButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNavigatorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
