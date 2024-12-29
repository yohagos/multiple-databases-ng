import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth-guard/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./core/home/home.component').then(mod => mod.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(mod => mod.routes),
    canActivate: [AuthGuard]
  },
  {
    path: 'tickets',
    loadChildren: () => import('./features/tickets/tickets.routes').then(mod =>
      mod.routes),
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    loadChildren: () => import('./features/projects/projects.routes').then(mod => mod.routes),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadComponent: () => import('./features/user-management/user-management.component').then(mod => mod.UserManagementComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
