import { Action } from '@ngrx/store';
import { CalendarEvent } from 'angular-calendar';

export enum CalenderActionTypes {
    Add = '[Calender] Add',
    Update = '[Calender] Update',
    Delete = '[Calender] Delete'
}

export class AddEvent implements Action {
    readonly type = CalenderActionTypes.Add;
    constructor(public payload: CalendarEvent) {}
}

export class UpdateEvent implements Action {
    readonly type = CalenderActionTypes.Update;
    constructor(public payload: CalendarEvent) {}
}

export class DeleteEvent implements Action {
    readonly type = CalenderActionTypes.Delete;
    constructor(public payload: CalendarEvent) {}
}

export type CalenderActions = 
| AddEvent
| UpdateEvent
| DeleteEvent