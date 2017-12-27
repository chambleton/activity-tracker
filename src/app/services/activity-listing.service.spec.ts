import { TestBed, inject } from '@angular/core/testing';

import { ActivityListingService } from './activity-listing.service';

describe('ActivityListingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityListingService]
    });
  });

  it('should be created', inject([ActivityListingService], (service: ActivityListingService) => {
    expect(service).toBeTruthy();
  }));
});
