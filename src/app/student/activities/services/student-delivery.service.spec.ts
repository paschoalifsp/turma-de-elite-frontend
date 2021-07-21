import { TestBed } from '@angular/core/testing';

import { StudentDeliveryService } from './student-delivery.service';

describe('StudentDeliveryService', () => {
  let service: StudentDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
