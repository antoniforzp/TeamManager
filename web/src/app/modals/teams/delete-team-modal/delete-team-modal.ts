import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Team } from 'src/app/model/Team';
import { ModalWidths } from '../../Modals-def';
import {
  DeleteTeamModalComponent,
  DeleteTeamModalComponentEntry,
} from './delete-team-modal.component';

export class DeleteTeamModal {
  constructor(private dialog: MatDialog) {}

  async open(teams: Team[]): Promise<MatDialogRef<DeleteTeamModalComponent>> {
    await import('./delete-team-modal.module');
    return this.dialog.open(DeleteTeamModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        teams,
      } as DeleteTeamModalComponentEntry,
    });
  }
}
