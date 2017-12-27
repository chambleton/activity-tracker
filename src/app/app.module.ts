import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonsModule, BsDropdownModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { GoalCalendarComponent } from './goal-calendar/goal-calendar.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserSigninComponent } from './user/user-signin/user-signin.component';
import { AppRoutingModule } from './app-routing.module';
import { ActivityTrackerComponent } from './activity-tracker/activity-tracker.component';
import { ActivityTrackingService } from './services/activity-tracking.service';
import { ActivityListingService } from './services/activity-listing.service';
import { DayDisplayComponent } from './day-display/day-display.component';

@NgModule({
  declarations: [
    AppComponent,
    GoalCalendarComponent,
    UserProfileComponent,
    UserSigninComponent,
    ActivityTrackerComponent,
    DayDisplayComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule,
    ButtonsModule.forRoot(), BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything    
    CoreModule,
  ],
  providers: [ActivityTrackingService, ActivityListingService],
  bootstrap: [AppComponent]
})

export class AppModule { }
