import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { } from './reducers/calender.reducer'
import { DashboardComponent } from './dashboard.component';
import { reducer } from './reducers/calender.reducer';
import { CalendarModule } from 'angular-calendar';

@NgModule({
    imports: [
        StoreModule.forFeature('events', reducer),
        CalendarModule.forRoot()
    ],
    exports: [DashboardComponent],
    declarations: [DashboardComponent],
    providers: [],
})
export class DashboardModule { }
