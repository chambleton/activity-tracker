import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { ActivityTrackingService } from '../services/activity-tracking.service';

@Component({
  selector: 'activity-tracker',
  templateUrl: './activity-tracker.component.html',
  styleUrls: ['./activity-tracker.component.css']
})

export class ActivityTrackerComponent implements OnInit {

  title: string = 'Activity Tracker';  
    
 /// TODO: get rid of items!! only talk to db thru service!
  items: Observable<any[]>;
  
  constructor(private activityTrackingService: ActivityTrackingService,    
    private afs: AngularFirestore) {

    this.items = afs.collection('items').valueChanges();
    console.log(this.items);
  }

  ngOnInit() {    
  }

  onCalendarItemClick($event: Date) {
    this.activityTrackingService.selectedDate = $event;    
  }

}
