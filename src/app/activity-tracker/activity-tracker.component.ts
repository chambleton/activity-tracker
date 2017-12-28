import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Activity } from '../services/activity.model';
import { ActivityListingService } from '../services/activity-listing.service';
import { ActivityTrackingService } from '../services/activity-tracking.service';

@Component({
  selector: 'activity-tracker',
  templateUrl: './activity-tracker.component.html',
  styleUrls: ['./activity-tracker.component.css']
})

export class ActivityTrackerComponent implements OnInit {

  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() dateChanged: EventEmitter<any> = new EventEmitter<any>();

  title = 'Activity Tracker';  

  activityText: string;
 // chartData: any = {"1512173522":70,"1510297200":27,"1510100522":10};
  chartData: any = {};
  // TODO: get rid of items!! only talk to db thru service!
  items: Observable<any[]>;
  
  constructor(afs: AngularFirestore, 
    public activityListingService: ActivityListingService, 
    public activityTrackingService: ActivityTrackingService) {

    this.items = afs.collection('items').valueChanges();
    console.log(this.items);
  }

  ngOnInit() {
    this.activityText = this.activityListingService.defaultActivityList;
  }

  onUpdateActivities() {
    this.activityListingService.updateActivities(this.activityText);
  }

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

  onCalendarItemClick($event: Date) {
    this.activityTrackingService.selectedDate = $event;
    this.dateChanged.emit($event);
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
}
