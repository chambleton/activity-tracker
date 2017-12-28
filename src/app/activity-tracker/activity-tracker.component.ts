import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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

  
 // chartData: any = {"1512173522":70,"1510297200":27,"1510100522":10};
  chartData: any = {};
  // TODO: get rid of items!! only talk to db thru service!
  items: Observable<any[]>;
  
  constructor(afs: AngularFirestore, 
    public activityTrackingService: ActivityTrackingService) {

    this.items = afs.collection('items').valueChanges();
    console.log(this.items);
  }

  ngOnInit() {
    
  }

  onCalendarItemClick($event: Date) {
    this.activityTrackingService.selectedDate = $event;
    //this.dateChanged.emit($event);
  }

}
