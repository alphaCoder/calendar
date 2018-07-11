import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
    {path: 'login', loadChildren: './auth/auth.module#AuthModule' }
];