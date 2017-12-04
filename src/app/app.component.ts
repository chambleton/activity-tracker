import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  activityText: string = "Quiet Time: 20, Workout: 20, Water Serving: 5, Protein Shake: 25, Read book";
  title = 'Activity Tracker';
  chartData: any = {"1512173522":70,"1510297200":27,"1510100522":10};
  selectedDate: any = new Date();
  activities: any;

  constructor() {};

  ngOnInit() {
    this.onUpdateActivities();
  }

  onUpdateActivities() {
    this.activities = [];

    var acts = this.activityText.split(',');
    acts.forEach((act) => {
      var a = act.split(':');
      var b = {};
      b["caption"] = a[0].trim();
      b["weight"] = a[1] ? parseInt(a[1].trim()) : 10;      
      this.activities.push(b);
    });
  }

  onActivityClick(activity: any) {
    var entryDate = this.selectedDate;
    //var now = new Date();
    var entry = Math.floor(entryDate.getTime()/1000);
    if (this.chartData[entry]) {
      this.chartData[entry] += activity.weight;
    }
    else {
      this.chartData[entry] = activity.weight;
    }
    this.dataChanged.emit(this.chartData);    
  }

  onCalendarItemClick($event) {
    this.selectedDate = $event;
  }
}
