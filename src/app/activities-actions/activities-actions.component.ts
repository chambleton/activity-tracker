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

/*
  onActivityClick(activity: Activity) {

    var newActivity = new Activity(activity.caption, activity.weight);    
    newActivity.setDateOnly(this.activityTrackingService.selectedDate);
    this.activityTrackingService.addActivity(newActivity);
    
    var entry = newActivity.dateToNumber();    
    if (this.chartData[entry]) {
      this.chartData[entry] += activity.weight;
    }
    else {
      this.chartData[entry] = activity.weight;
    }

    this.dataChanged.emit(this.chartData);    
  }

  onActivityDeleted($event: Activity) {
    var newDate = new Date($event.date.getFullYear(), $event.date.getMonth(), $event.date.getDate());
    var entry = $event.dateToNumber();
    
    if (this.chartData[entry] !== null) {      
        this.chartData[entry] -= $event.weight;
      
      if (this.activityTrackingService.getActivitiesByDate($event.date).length <= 0) {
        this.chartData[entry] = null;
      }      
    }
    
    this.dataChanged.emit(this.chartData);   
  }
  */
}
