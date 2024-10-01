import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'regions',
    pathMatch: 'full',
  },
  {
    path: 'regions',
    loadComponent: () => import('./routes/regions/regions.route'),
    children: [
      {
        path: ':code',
        loadComponent: () =>
          import('./routes/regions/departements/departements.route'),
      },
    ],
  },
];
