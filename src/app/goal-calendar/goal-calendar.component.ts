import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { ActivityTrackerComponent } from '../activity-tracker/activity-tracker.component';
import { ObservableMedia } from "@angular/flex-layout";
import 'cal-heatmap';

@Component({
  selector: 'goal-calendar',
  templateUrl: './goal-calendar.component.html',
  styleUrls: ['./goal-calendar.component.css']
})

export class GoalCalendarComponent implements OnInit, DoCheck {
  
  private yearView: boolean = true;  
  @Input() data: any;
  private oldData: any = {};
  @Output() itemClick: EventEmitter<any> = new EventEmitter<any>();


  constructor(private observableMedia: ObservableMedia) { }


  ngDoCheck() {    
    // poor man's change detection!
    if(JSON.stringify(this.data) !== JSON.stringify(this.oldData)) {            
      Object.assign(this.oldData, this.data);
      this.calendar.update(this.data, false, this.calendar.RESET_SINGLE_ON_UPDATE);
    }    
  }


  ngOnInit() {
    this.yearView = !this.observableMedia.isActive('xs');    

    var now = new Date();    
    var thisYear = new Date(now.getFullYear()-1, now.getMonth(), now.getDate());
    var thisQuarter = new Date(now.getFullYear(), now.getMonth()-3, now.getDate());
    var past = this.yearView ? thisYear : thisQuarter;
    var monthRange = this.yearView ? 13 : 4;

    this.calendar.init({
      start: past,
      highlight: [now],
      minDate: past,
      maxDate: now,          
      range: monthRange,
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

}
/*
docs: http://cal-heatmap.com/#start
https://stackoverflow.com/questions/21119559/how-do-i-create-a-continuous-github-like-calendar-with-cal-heatmap
 */