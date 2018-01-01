import { Component, OnInit } from '@angular/core';
import { ActivityListingService } from '../services/activity-listing.service';
import { ActivityTrackingService } from '../services/activity-tracking.service';
import { Activity } from '../services/activity.model';

@Component({
  selector: 'activities-actions',
  templateUrl: './activities-actions.component.html',
  styleUrls: ['./activities-actions.component.css']
})
export class ActivitiesActionsComponent implements OnInit {

  showWeights: boolean = false;

  constructor(public activityListingService: ActivityListingService, 
              public activityTrackingService: ActivityTrackingService) { }

  ngOnInit() {
  }

  onActivityClick(activity: Activity) {
    var newActivity = new Activity(activity.caption, activity.weight);    
    newActivity.setDateOnly(this.activityTrackingService.selectedDate);
    this.activityTrackingService.addActivity(newActivity);   
  }

}
