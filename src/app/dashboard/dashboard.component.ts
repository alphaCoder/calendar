import { Component, OnInit, ViewChild } from '@angular/core';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject, Observable } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { Store, select } from '@ngrx/store';
import * as fromCalender from './reducers/calender.reducer';
import * as calenderActions from './actions/calender.actions';
import { tap } from 'rxjs/operators';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
interface IAppState {
  events: CalendarEvent[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  activeDayIsOpen: boolean = true;
  view: string = 'month';

  viewDate: Date = new Date();
  
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  events$: Observable<CalendarEvent[]>;
  test:any[] = [];
  constructor(private store: Store<fromCalender.State>) {
    this.events$ = store.pipe(select(fromCalender.getEvents));
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('handle event', action, event);
  }

  addEvent(): void {
    
    let e = {
      id: Math.random(),
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    };
    this.store.dispatch(new calenderActions.AddEvent(e));
    this.refresh.next();
  }

  deleteEvent(e:CalendarEvent) {
    this.store.dispatch(new calenderActions.DeleteEvent(e));
  }

  update(event: CalendarEvent, prop, val) {
    // this is temporary workaround as calenderEvent are immutable
    var e = {...event};
    if (prop === 'title') {
      e.title = val;
    }
    else if (prop == 'start') {
      e.start = val;
    } else {
      e.end = val;
    }
    this.store.dispatch(new calenderActions.UpdateEvent(e));
  }
}
