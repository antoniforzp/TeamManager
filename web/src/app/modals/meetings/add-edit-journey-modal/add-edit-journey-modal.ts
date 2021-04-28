import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Journey } from 'src/app/model/Journey';
import { ModalModes, ModalWidths } from '../../Modals-def';
import {
  AddEditJourneyModalComponent,
  AddEditJourneyModalComponentEntry,
} from './add-edit-journey-modal.component';

export class AddEditJourneyModal {
  constructor(private dialog: MatDialog) {}

  async openAdd(): Promise<MatDialogRef<AddEditJourneyModalComponent>> {
    await import('./add-edit-journey-modal.module');
    return this.dialog.open(AddEditJourneyModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        mode: ModalModes.ADD,
      } as AddEditJourneyModalComponentEntry,
    });
  }

  async openEdit(
    journey: Journey
  ): Promise<MatDialogRef<AddEditJourneyModalComponent>> {
    await import('./add-edit-journey-modal.module');
    return this.dialog.open(AddEditJourneyModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        mode: ModalModes.EDIT,
        journeyData: journey,
      } as AddEditJourneyModalComponentEntry,
    });
  }
}
