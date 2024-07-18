import { Routes } from '@angular/router';
import { LoginComponent } from './features/pages/login/login.component';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '',
    component: DashboardComponent, // Route to DashboardComponent on '/'
    pathMatch: 'full', // Ensure full path match for root
  },
];
