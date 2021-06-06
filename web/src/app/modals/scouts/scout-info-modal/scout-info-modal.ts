import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/model/data/Role';
import { Scout } from 'src/app/model/data/Scout';
import { ModalWidths } from '../../Modals-def';
import {
  ScoutInfoModalComponent,
  ScoutInfoModalComponentEntry,
} from './scout-info-modal.component';

export class ScoutInfoModal {
  constructor(private dialog: MatDialog) {}

  async open(
    scout: Scout,
    scoutRoles: Role[]
  ): Promise<MatDialogRef<ScoutInfoModalComponent>> {
    await import('./scout-info-modal.module');
    return this.dialog.open(ScoutInfoModalComponent, {
      width: ModalWidths.WIDE,
      disableClose: true,
      data: {
        scout,
        scoutRoles,
      } as ScoutInfoModalComponentEntry,
    });
  }
}
