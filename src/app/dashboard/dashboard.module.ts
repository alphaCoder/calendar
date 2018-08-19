import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { } from './reducers/calender.reducer'
import { DashboardComponent } from './dashboard.component';
import { reducer } from './reducers/calender.reducer';
import { CalendarModule } from 'angular-calendar';
import { EffectsModule } from '@ngrx/effects';
import { CalenderEffects } from './effects/calender.effects';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        StoreModule.forFeature('events', reducer),
        CalendarModule.forRoot(),
        CommonModule,
        FormsModule,
        BrowserModule 
     //   EffectsModule.forFeature([CalenderEffects])
    ],
    exports: [DashboardComponent],
    declarations: [DashboardComponent],
    providers: [],
})
export class DashboardModule { }
