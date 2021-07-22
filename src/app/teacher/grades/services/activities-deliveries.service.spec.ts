import { TestBed } from '@angular/core/testing';

import { ActivitiesDeliveriesService } from './activities-deliveries.service';

describe('ActivitiesDeliveriesService', () => {
  let service: ActivitiesDeliveriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitiesDeliveriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
