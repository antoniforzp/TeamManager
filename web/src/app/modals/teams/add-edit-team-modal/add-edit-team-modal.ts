import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Team } from 'src/app/model/data/Team';
import { ModalModes, ModalWidths } from '../../Modals-def';
import {
  AddEditTeamModalComponent,
  AddEditTeamModalComponentEntry,
} from './add-edit-team-modal.component';

export class AddEditTeamModal {
  constructor(private dialog: MatDialog) {}

  async openAdd(): Promise<MatDialogRef<AddEditTeamModalComponent>> {
    await import('./add-edit-team-modal.module');
    return this.dialog.open(AddEditTeamModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        mode: ModalModes.ADD,
      } as AddEditTeamModalComponentEntry,
    });
  }

  async openEdit(team: Team): Promise<MatDialogRef<AddEditTeamModalComponent>> {
    await import('./add-edit-team-modal.module');
    return this.dialog.open(AddEditTeamModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        mode: ModalModes.EDIT,
        teamData: team,
      } as AddEditTeamModalComponentEntry,
    });
  }
}
