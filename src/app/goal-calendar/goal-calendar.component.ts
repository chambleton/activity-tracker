import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivityTrackerComponent } from '../activity-tracker/activity-tracker.component';
import 'cal-heatmap';

@Component({
  selector: 'goal-calendar',
  templateUrl: './goal-calendar.component.html',
  styleUrls: ['./goal-calendar.component.css']
})

export class GoalCalendarComponent implements OnInit {

  constructor(private activityTrackerComponent: ActivityTrackerComponent) { }
  
  @Input() data: any;
  @Output() itemClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.activityTrackerComponent.dataChanged.subscribe((result) => {      
      this.calendar.update(result, false, this.calendar.RESET_SINGLE_ON_UPDATE);
    });

    var now = new Date();    
    var past = new Date(now.getFullYear()-1, now.getMonth(), now.getDate());

    this.calendar.init({
      start: past,
      highlight: [now],
      minDate: past,
      maxDate: now,          
      range: 13,
      rowLimit: 7,
      domainGutter: 5,
      domain: "month",
      subDomain: "day",
      itemSelector: "#heatmap",
      onClick: (date, nb) => {
        this.calendar.highlight([now, date]);
        this.itemClick.emit(date);              
      },
			data: this.data
		});

  };
  calendar = new CalHeatMap();

  ngOnDestroy() {
    this.activityTrackerComponent.dataChanged.unsubscribe();
  }

}
/*
docs: http://cal-heatmap.com/#start
https://stackoverflow.com/questions/21119559/how-do-i-create-a-continuous-github-like-calendar-with-cal-heatmap
 */