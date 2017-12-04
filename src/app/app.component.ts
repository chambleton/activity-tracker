import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  title = 'app';
  chartData: any = {"1512173522":70,"1510297200":27,"1510100522":10};
  selectedDate: any = new Date();

  constructor() {};

  activities: any = [
    {name: "quiet", weight: 20, caption: "Quiet Time"},
    {name: "exercise", weight: 20, caption: "Workout"},
    {name: "water", weight: 5, caption: "Water Serving"},
    {name: "protein", weight: 25, caption: "Protein Shake"},
    {name: "read", weight: 10, caption: "Read book"}
  ];
  
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
