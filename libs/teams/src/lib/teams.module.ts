import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { teamsRoutes } from './lib.routes';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { UiModule } from '@team-manager/ui';
import { ModelsModule } from '@team-manager/models';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTeamDialogComponent } from './dialogs/add-team-dialog/add-team-dialog.component';
import { AddMemberDialogComponent } from './dialogs/add-member-dialog/add-member-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MembersDataService } from './services/data/members-data.service';
import { MembersApiService } from './services/api/members-api.service';
import { TeamsApiService } from './services/api/teams-api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModelsModule,
    UiModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    RouterModule.forChild(teamsRoutes),
  ],
  declarations: [
    TeamsListComponent,
    TeamDetailComponent,
    AddTeamDialogComponent,
    AddMemberDialogComponent,
  ],
  providers: [TeamsApiService, MembersApiService, MembersDataService],
})
export class TeamsModule {}
