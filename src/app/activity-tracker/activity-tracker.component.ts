import { Component, OnInit } from '@angular/core';

import { ActivityTrackingService } from '../services/activity-tracking.service';

@Component({
  selector: 'activity-tracker',
  templateUrl: './activity-tracker.component.html',
  styleUrls: ['./activity-tracker.component.css']
})

export class ActivityTrackerComponent implements OnInit {

  title: string = 'Activity Tracker';  
  
  constructor(private activityTrackingService: ActivityTrackingService) {
  }

  ngOnInit() {
    this.activityTrackingService.getActivities();
  }

  onCalendarItemClick($event: Date) {
    this.activityTrackingService.selectedDate = $event;    
  }

}
