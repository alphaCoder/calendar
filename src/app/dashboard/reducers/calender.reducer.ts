import { CalenderActions, CalenderActionTypes } from '../actions/calender.actions';
import { CalendarEvent } from 'angular-calendar';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    events: CalendarEvent[]
}

export const initialState: State = {
    events: []
}

export function reducer(state = initialState, action: CalenderActions): State {
    switch(action.type) {
        case CalenderActionTypes.Add: 
            return {
                events: [...state.events, action.payload]
            }
       
        case CalenderActionTypes.Update: 
            const updatedEvents = state.events.map(
                item => action.payload.id ==item.id ? action.payload: item
            );
            
          return {
              events: updatedEvents
          };
        case CalenderActionTypes.Delete: 
            return {
                events: state.events.filter(item => item.id != action.payload.id)
            }
        
        default:
            return state;    
        }
}

// export const getEvents = (state: State) => state.byHash.values();

const getEventsFeatureState = createFeatureSelector<State>('events');
export const getEvents = createSelector(
    getEventsFeatureState,
    state => state.events
);