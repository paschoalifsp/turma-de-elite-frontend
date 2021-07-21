import { TestBed } from '@angular/core/testing';

import { IsTeacherGuard } from './is-teacher.guard';

describe('IsTeacherGuard', () => {
  let guard: IsTeacherGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsTeacherGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
