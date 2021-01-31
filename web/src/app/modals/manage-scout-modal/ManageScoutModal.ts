import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageModes } from '../../utils/PageModes';
import {
  ManageScoutDialogData,
  ManageScoutModalComponent,
} from './manage-scout-modal.component';

export class ManageScoutModal {
  constructor(private dialog: MatDialog) {}

  open(mode: PageModes): MatDialogRef<ManageScoutModalComponent> {
    return this.dialog.open(ManageScoutModalComponent, {
      width: '80%',
      disableClose: true,
      data: {
        mode,
      } as ManageScoutDialogData,
    });
  }
}
