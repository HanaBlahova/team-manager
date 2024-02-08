import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemberBase, Roles, Team } from '@team-manager/models';
import { MembersDataService } from '../../services/data/members-data.service';
import { Observable } from 'rxjs';
import { TeamsApiService } from '../../services/api/teams-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'team-manager-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrl: './add-member-dialog.component.scss',
})
export class AddMemberDialogComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private membersDataService: MembersDataService,
    @Inject(DIALOG_DATA)
    public data: {
      team: Team;
    },
    @Inject(DialogRef) private ref: DialogRef,
    private fb: FormBuilder,
    private teamsApiService: TeamsApiService
  ) {}
  public allMembers: MemberBase[] = [];
  public availableMembers$!: Observable<MemberBase[]>;

  public roles = Object.keys(Roles).map((role) => role);

  ngOnInit() {
    this.form = this.fb.group({
      memberId: [null, Validators.required],
      role: [null, Validators.required],
      position: [null],
    });

    this.membersDataService
      .getAllMembers()
      .pipe(untilDestroyed(this))
      .subscribe((members) => (this.allMembers = members));
    this.availableMembers$ = this.membersDataService.getDisponibleMembers();
  }

  onSubmit() {
    const member = this.allMembers.find(
      (m) => m.id === +this.form.value.memberId
    ) as MemberBase;
    this.teamsApiService.updateTeam({
      ...this.data?.team,
      membersList: [
        ...this.data.team.membersList,
        {
          ...member,
          role: this.form.value.role,
          position: this.form.value.position,
        },
      ],
    });
    this.closeDialog();
  }

  closeDialog() {
    this.ref.close();
  }
}
