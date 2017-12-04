import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GoalCalendarComponent } from './goal-calendar/goal-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    GoalCalendarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
