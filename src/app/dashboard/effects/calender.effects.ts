import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CalenderActionTypes, AddEvent, UpdateEvent, DeleteEvent } from '../actions/calender.actions';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CalenderEffects {

    constructor(
        private actions$: Actions
    ) { }

    @Effect()
    addEvent$ = this.actions$.pipe(
        ofType(CalenderActionTypes.Add),
        tap(x=> console.log('effect event', x)),
        map((action: AddEvent) =>action.payload),
        exhaustMap(e=> of(new AddEvent(e)))
    );

}