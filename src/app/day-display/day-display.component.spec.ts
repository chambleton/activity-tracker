import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDisplayComponent } from './day-display.component';

describe('DayDisplayComponent', () => {
  let component: DayDisplayComponent;
  let fixture: ComponentFixture<DayDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
