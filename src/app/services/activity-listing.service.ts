import { Injectable } from '@angular/core';
import { Activity } from './activity.model';

// this class manages the clickable list/buttons 

@Injectable()
export class ActivityListingService {

  activities: Array<Activity> = [];  
  defaultActivityList: string = "Quiet Time: 20, Workout: 20, Water Serving: 5, Protein Shake: 15, Read books, Watch TV: -20, Sugar: -10";

  constructor() {
    this.updateActivities(this.defaultActivityList);
  }

  getActivities(): Array<Activity> {
    return this.activities;
  }

  updateActivities(activityText: string) {
    this.activities = [];

    var acts = activityText.split(',');
    acts.forEach((act) => {
      var a = act.split(':');
      var caption = a[0].trim();
      if (caption.length > 0) {
        var weight = a[1] ? parseInt(a[1].trim()) : 10;
        
        if (weight > 20) {
          weight = 20;
        }
        if (weight < -20) {
          weight = -20;
        }
        if (weight === 0) {
          weight = 1;
        }
        this.activities.push(new Activity(caption, weight));
      }      
    });

  }

}
