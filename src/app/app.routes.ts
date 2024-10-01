import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'regions',
    pathMatch: 'full',
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
];
