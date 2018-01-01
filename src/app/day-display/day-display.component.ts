import { Component, OnInit } from '@angular/core';
import { ActivityTrackingService } from '../services/activity-tracking.service';
import { Activity } from '../services/activity.model';
import { Action } from 'ngx-bootstrap/mini-ngrx';

@Component({
  selector: 'day-display',
  templateUrl: './day-display.component.html',
  styleUrls: ['./day-display.component.css']
})


export class DayDisplayComponent implements OnInit {

  constructor(public activityTrackingService: ActivityTrackingService) { 
  }

  ngOnInit() {    
  }

}
