import { Routes } from '@angular/router';
import { LoginComponent } from './features/pages/common/login/login.component';
import { DashboardComponent } from './features/pages/common/dashboard/dashboard.component';
import { SettingsComponent } from './features/pages/common/settings/settings.component';
import { AdminGroupsComponent } from './features/pages/admin/admin-groups/admin-groups.component';
import { AdminTeachersComponent } from './features/pages/admin/admin-teachers/admin-teachers.component';
import { AdminSubjectsComponent } from './features/pages/admin/admin-subjects/admin-subjects.component';

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
    { path: 'settings', component: SettingsComponent },
    {
        path: 'groups',
        component: AdminGroupsComponent,
        title: 'Groups',
    },
    {
        path: 'teachers',
        component: AdminTeachersComponent,
        title: 'Teachers',
    },
    {
        path: 'subjects',
        component: AdminSubjectsComponent,
        title: 'Subjects',
    },
    {
        path: '**',
        redirectTo: '/',
    },
];
