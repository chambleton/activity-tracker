import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonsModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { GoalCalendarComponent } from './goal-calendar/goal-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    GoalCalendarComponent
  ],
  imports: [
    BrowserModule,
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
