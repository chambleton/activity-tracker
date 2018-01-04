import { Injectable } from '@angular/core';
import { Activity } from './activity.model';
import { error } from 'util';
import { AuthService } from '../core/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class ActivityTrackingService {

  selectedDate: Date;
  private activities: Array<Activity>;  
  private activityCounts: any = {};

  constructor(private auth: AuthService, 
              private afs: AngularFirestore) { 
    this.selectedDate = new Date();
  }
  
  getActivities(): Array<Activity> { 
    
    if (!this.activities) {
      this.activities = [];  // set so we only go thru this ONCE; the promise will fill it!

      var docRef = this.afs.collection('activities').doc(this.auth.currentUser.uid).ref;           
      docRef.get().then((doc) => {
        if (doc.exists) {
          this.activities = JSON.parse(doc.data().content);
          this.activities.forEach((act) => {
            this.updateActivityCount(act);
          });     
        }           
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
    
    return this.activities;
  }

  saveActivities() {
    this.afs.collection('activities').doc(this.auth.currentUser.uid).set({'content': JSON.stringify(this.activities)});
  }

  addActivity(activity: Activity) {
    this.activities.push(activity);
    this.updateActivityCount(activity);
    this.saveActivities();
  }

  deleteActivity(activity: Activity) {
    var index = this.activities.indexOf(activity);
    if (index >= 0) {
      this.activities.splice(index, 1);
      this.deleteActivityCount(activity);
      this.saveActivities();
    }
    else {
      throw error("Couldn't find activity!");
    }
  }

  getActivitiesBySelectedDate(): Array<Activity> {
    return this.getActivitiesByDate(this.selectedDate);
  }

  private datesMatch(date1: Date, date2: Date): boolean {
    var date1 = new Date(date1);
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
  
  private updateActivityCount(activity: Activity) {    
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
