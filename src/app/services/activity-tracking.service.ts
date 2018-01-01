import { Injectable } from '@angular/core';
import { Activity } from './activity.model';
import { error } from 'util';


@Injectable()
export class ActivityTrackingService {

  selectedDate: Date;
  private activities: Array<Activity> = [];  
  private activityCounts: any = {};

  constructor() { 
    this.selectedDate = new Date();
  }
  
  addActivity(activity: Activity) {
    this.activities.push(activity);
    this.upsertActivityCount(activity);
  }

  deleteActivity(activity: Activity) {
    var index = this.activities.indexOf(activity);
    if (index >= 0) {
      this.activities.splice(index, 1);
      this.deleteActivityCount(activity);
    }
    else {
      throw error("Couldn't find activity!");
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

  getDailyActivityCounts(): any {
    return this.activityCounts;
  }
  
  private upsertActivityCount(activity: Activity) {    
    var entry = activity.dateToNumber();    
    if (this.activityCounts[entry]) {
      this.activityCounts[entry] += activity.weight;
    }
    else {
      this.activityCounts[entry] = activity.weight;
    }   
  }

  private deleteActivityCount(activity: Activity) {
    var newDate = new Date(activity.date.getFullYear(), activity.date.getMonth(), activity.date.getDate());
    var entry = activity.dateToNumber();
    
    if (this.activityCounts[entry] !== null) {      
        this.activityCounts[entry] -= activity.weight;
      
      if (this.getActivitiesByDate(activity.date).length <= 0) {
        this.activityCounts[entry] = null;
      }      
    }  
  }

}
