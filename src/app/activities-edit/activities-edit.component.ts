import { Component, OnInit } from '@angular/core';
import { ActivityListingService } from '../services/activity-listing.service';

@Component({
  selector: 'activities-edit',
  templateUrl: './activities-edit.component.html',
  styleUrls: ['./activities-edit.component.css']
})
export class ActivitiesEditComponent implements OnInit {

  activityText: string;

  constructor(public activityListingService: ActivityListingService) { }

  ngOnInit() {
    this.activityText = this.activityListingService.defaultActivityList;
  }

}
