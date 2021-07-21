import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementPageComponent } from './achievement-page.component';

describe('AchievementPageComponent', () => {
  let component: AchievementPageComponent;
  let fixture: ComponentFixture<AchievementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
