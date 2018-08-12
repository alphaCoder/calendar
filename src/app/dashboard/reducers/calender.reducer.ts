import { CalenderActions, CalenderActionTypes } from '../actions/calender.actions';
import { CalendarEvent } from 'angular-calendar';

export interface State {
    byId: Array<string|number>,
    byHash: Map<string, CalendarEvent>
}

export const initialState: State = {
    byId: [],
    byHash: new Map<string, CalendarEvent>()
}

export function reducer(state = initialState, action: CalenderActions): State {
    switch(action.type) {
        case CalenderActionTypes.Add: 
        console.log('add', state);
            return {
                byId: [...state.byId, action.payload.id],
                byHash: {
                    ...state.byHash,
                    [action.payload.id]: action.payload
                }
            }
       
        case CalenderActionTypes.Update: 
            state.byHash[action.payload.id]= {
                ...state.byHash[action.payload.id],
                ...action.payload
            }
          return state;
        case CalenderActionTypes.Delete: 
            const { [action.payload.id]: deletedEvent, ...newStateByHash} = state.byHash;
            return {
                byId: state.byId.filter(item => item !== action.payload.id),
                byHash: newStateByHash
            }
        
        default:
        console.log('reducer action type', action);
            return state;    
        }
}

export const getEvents = (state: State) => state.byHash.values();