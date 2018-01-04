import { Component, OnInit } from '@angular/core';
import { ActivityListingService } from '../services/activity-listing.service';

@Component({
  selector: 'activities-edit',
  templateUrl: './activities-edit.component.html',
  styleUrls: ['./activities-edit.component.css']
})

export class ActivitiesEditComponent implements OnInit {

  showEdits: boolean = false;
  activityListText: string;

  constructor(public activityListingService: ActivityListingService) { 
    
  }

  ngOnInit() {         
  }

  showEditPanel() {
    this.activityListText = this.activityListingService.getActivityText();
    this.showEdits = true;
  }

  updateActivities() {
    this.activityListingService.updateActivities(this.activityListText);
    this.showEdits = false;
  }
            
}
