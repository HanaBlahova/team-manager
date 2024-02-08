import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Team } from '@team-manager/models';
import { TeamsApiService } from '../../services/api/teams-api.service';

@Component({
  selector: 'team-manager-add-team',
  templateUrl: './add-team-dialog.component.html',
  styleUrl: './add-team-dialog.component.scss',
})
export class AddTeamDialogComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    @Inject(DIALOG_DATA)
    public data: {
      team?: Team;
    },
    @Inject(DialogRef) private ref: DialogRef,
    private fb: FormBuilder,
    private teamsApiService: TeamsApiService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data?.team?.name, Validators.required],
    });
  }

  onSubmit() {
    if (this.data?.team) {
      this.teamsApiService.updateTeam({
        ...this.data?.team,
        name: this.form.value.name,
        id: this.data?.team?.id,
      });
    } else {
      this.teamsApiService.createTeam(this.form.value);
    }
    this.closeDialog();
  }

  closeDialog() {
    this.ref.close();
  }
}
