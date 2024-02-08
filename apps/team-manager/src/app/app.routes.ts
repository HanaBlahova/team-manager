import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'teams',
      },
      {
        path: '',
        children: [
          {
            path: 'teams',
            loadChildren: () =>
              import('@team-manager/teams').then((m) => m.TeamsModule),
          },
        ],
      },
    ],
  },
];
