import { TestBed, inject } from '@angular/core/testing';

import { ActivityTrackingService } from './activity-tracking.service';

describe('ActivityTrackingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityTrackingService]
    });
  });

  it('should be created', inject([ActivityTrackingService], (service: ActivityTrackingService) => {
    expect(service).toBeTruthy();
  }));
});
