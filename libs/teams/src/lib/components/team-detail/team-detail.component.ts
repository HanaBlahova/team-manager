import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@team-manager/ui';
import { AddMemberDialogComponent } from '../../dialogs/add-member-dialog/add-member-dialog.component';
import { AddTeamDialogComponent } from '../../dialogs/add-team-dialog/add-team-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Member, Team } from '@team-manager/models';
import { TeamsApiService } from '../../services/api/teams-api.service';
import { Observable, mergeMap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'team-manager-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.scss',
})
export class TeamDetailComponent implements OnInit {
  public team$?: Observable<Team | undefined>;
  public team!: Team;
  public members: Member[] = [];
  public displayedColumns = ['name', 'role', 'position'];

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private teamsApiService: TeamsApiService
  ) {}

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      untilDestroyed(this),
      mergeMap((params) => {
        const team = this.teamsApiService.getTeam(+params['id']);
      this.team$ = team;
      return team;
      })
    )
    .subscribe((team) => {
        this.members = team?.membersList || [];
        this.team = team as Team;
    });
  }

  addMember() {
    this.dialog.open(AddMemberDialogComponent, {
      width: '400px',
      data: {
        team: this.team,
      },
    });
  }

  editTeam() {
    this.dialog.open(AddTeamDialogComponent, {
      width: '400px',
      data: {
        team: this.team,
      },
    });
  }

  removeTeam() {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete team',
        content: `Do you really want to delete ${this.team?.name}?`,
        confirm: () => this.teamsApiService.deleteTeam(this.team.id),
      },
    });
  }
}
