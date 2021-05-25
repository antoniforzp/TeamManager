import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRank } from 'src/app/model/IRank';
import { Rank } from 'src/app/model/Rank';
import { RanksService } from 'src/app/services/data/ranks.service';
import { Results } from 'src/app/utils/Result';

@Component({
  templateUrl: './ranks-info-modal.component.html',
  styleUrls: ['./ranks-info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RanksInfoModalComponent implements OnInit {
  destroy$ = new Subject();
  pageLoaded = false;
  pageError: HttpErrorResponse;

  ranks: Rank[] = [];
  iRanks: IRank[] = [];

  constructor(
    private dialogRef: MatDialogRef<RanksInfoModalComponent>,
    private ranksService: RanksService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    forkJoin({
      ranks: this.ranksService.getRanks(),
      iRanks: this.ranksService.getInstructorRanks(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (x) => {
          this.ranks = x.ranks;
          this.iRanks = x.iRanks;

          console.log(this.ranks);
          console.log(this.iRanks);

          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
        error: (err) => {
          this.pageError = err;

          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
      });
  }

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  createIRankBadge(rank: IRank): string {
    return 'instructor-rank-' + rank.rankId;
  }
}
