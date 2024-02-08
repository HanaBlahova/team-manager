import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'team-manager-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(DIALOG_DATA)
    public data: {
      title?: string;
      content: string;
      confirm: () => void;
      cancel: () => void;
    },
    @Inject(DialogRef) private ref: DialogRef
  ) {}

  confirmDialog() {
    this.data?.confirm && this.data.confirm();
    this.closeDialog();
  }

  closeDialog() {
    this.data?.cancel && this.data.cancel();
    this.ref.close();
  }
}
