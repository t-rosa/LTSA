import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'regions',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./routes/login/login.component'),
  },
  {
    path: 'regions',
    loadComponent: () => import('./routes/regions/region-list.component'),
    children: [
      {
        path: ':code',
        loadComponent: () =>
          import('./routes/regions/departements/departement-list.component'),
      },
    ],
  },
  {
    path: 'map',
    loadComponent: () => import('./routes/map/map.component'),
  },
];
