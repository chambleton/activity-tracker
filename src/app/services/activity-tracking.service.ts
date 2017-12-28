import { Injectable } from '@angular/core';
import { Activity } from './activity.model';
import { error } from 'util';

// this class manages the user's clicked activiites!

@Injectable()
export class ActivityTrackingService {

  selectedDate: Date;
  activities: Array<Activity> = [];  

  constructor() { 
    this.selectedDate = new Date();
  }

  getActivities(): Array<Activity> {
    return this.activities;
  }

  addActivity(activity: Activity) {
    this.activities.push(activity);
  }

  deleteActivity(activity: Activity) {
    var index = this.activities.indexOf(activity);
    if (index >= 0) {
      this.activities.splice(index, 1);
    }
    else {
      throw error("couldn't find activity!");
    }
  }

  getActivitiesBySelectedDate(): Array<Activity> {
    return this.getActivitiesByDate(this.selectedDate);
  }

  private datesMatch(date1: Date, date2: Date): boolean {
    return (date1.getDate() === date2.getDate() && 
            date1.getMonth() === date2.getMonth() && 
            date1.getFullYear() === date2.getFullYear());
  }

  getActivitiesByDate(selectedDate: Date): Array<Activity> {
    var bydate: Array<Activity> = [];
    this.activities.forEach((activity) => {
      if (this.datesMatch(activity.date, selectedDate)) {
        bydate.push(activity);
      }
    });

    return bydate;
  }

}
