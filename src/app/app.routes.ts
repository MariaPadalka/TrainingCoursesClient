import { Routes } from '@angular/router';
import { LoginComponent } from './features/pages/common/login/login.component';
import { DashboardComponent } from './features/pages/common/dashboard/dashboard.component';
import { SettingsComponent } from './features/pages/common/settings/settings.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  { path: 'settings', component: SettingsComponent }, // Додаємо маршрут до нового компонента
];
