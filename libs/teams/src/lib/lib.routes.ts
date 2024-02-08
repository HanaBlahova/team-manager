import { Route } from '@angular/router';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';

export const teamsRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: TeamsListComponent },
  {
    path: ':id',
    component: TeamDetailComponent,
  },
];
