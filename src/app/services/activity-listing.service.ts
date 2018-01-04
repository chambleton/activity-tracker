import { Injectable } from '@angular/core';
import { Activity } from './activity.model';
import { AuthService } from '../core/auth.service';

import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;
import {QueryFn} from 'angularfire2/firestore/interfaces';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ActivityListingService {

  activities: Array<Activity>;  
  activityListText: string;
  private defaultActivityList: string = "Quiet Time: 20, Workout: 20, Water Serving: 5, Protein Shake: 15, Read books, Watch TV: -20, Sugar: -10";

  constructor(private auth: AuthService, 
              private afs: AngularFirestore) {
               
  }

  getActivities(): Array<Activity> { 
    
    if (!this.activities) {
      this.activities = [];  // set so we only go thru this ONCE; the promise will fill it!

      var docRef = this.afs.collection('activity-list').doc(this.auth.currentUser.uid).ref;      
      this.activityListText = this.defaultActivityList;

      docRef.get().then((doc) => {        
        if (doc.exists) {
          this.activityListText = doc.data().content;          
        }
        this.updateActivities(this.activityListText);        
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
    
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
    
    this.afs.collection('activity-list').doc(this.auth.currentUser.uid).set({'content': activityText});
    this.activityListText = activityText;
  }

}
