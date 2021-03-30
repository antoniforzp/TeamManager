import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Team } from 'src/app/model/Team';
import { ModalWidths } from '../../Modals-def';
import {
  AddEditTeamModalComponent,
  AddEditTeamModalComponentEntry,
} from './add-edit-team-modal.component';

export class EditTeamModal {
  constructor(private dialog: MatDialog) {}

  async openAdd(): Promise<MatDialogRef<AddEditTeamModalComponent>> {
    await import('./add-edit-team-modal.module');
    return this.dialog.open(AddEditTeamModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
    });
  }

  async openEdit(team: Team): Promise<MatDialogRef<AddEditTeamModalComponent>> {
    await import('./add-edit-team-modal.module');
    return this.dialog.open(AddEditTeamModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        teamData: team,
      } as AddEditTeamModalComponentEntry,
    });
  }
}
