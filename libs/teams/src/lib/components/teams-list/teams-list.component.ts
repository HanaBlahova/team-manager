import { Component, OnInit } from '@angular/core';
import { AddTeamDialogComponent } from '../../dialogs/add-team-dialog/add-team-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Team } from '@team-manager/models';
import { TeamsApiService } from '../../services/api/teams-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'team-manager-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrl: './teams-list.component.scss',
})
export class TeamsListComponent implements OnInit {
  public teams!: Team[];
  public displayedColumns = ['name', 'members'];

  constructor(
    private dialog: MatDialog,
    private teamsApiService: TeamsApiService
  ) {}

  ngOnInit() {
    this.teamsApiService
      .getTeams()
      .pipe(untilDestroyed(this))
      .subscribe((teams) => (this.teams = teams));
  }

  public addTeam() {
    this.dialog.open(AddTeamDialogComponent, {
      width: '400px',
    });
  }
}
