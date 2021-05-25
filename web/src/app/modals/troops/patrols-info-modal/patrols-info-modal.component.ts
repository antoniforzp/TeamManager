import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Results } from 'src/app/utils/Result';

@Component({
  templateUrl: './patrols-info-modal.component.html',
  styleUrls: ['./patrols-info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatrolsInfoModalComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<PatrolsInfoModalComponent>) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }
}
