import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonsModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GoalCalendarComponent } from './goal-calendar/goal-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    GoalCalendarComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
