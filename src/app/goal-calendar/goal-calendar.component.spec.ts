import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalCalendarComponent } from './goal-calendar.component';

describe('GoalCalendarComponent', () => {
  let component: GoalCalendarComponent;
  let fixture: ComponentFixture<GoalCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
