import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Journey, JourneyPresence } from 'src/app/model/Journey';
import { Meeting, MeetingPresence } from 'src/app/model/Meeting';
import { Scout } from 'src/app/model/Scout';
import { JourneysService } from 'src/app/services/journeys.service';
import { MeetingsService } from 'src/app/services/meetings.service';
import { ScoutsService } from 'src/app/services/scouts.service';
import { Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';

export enum Modes {
  MANAGE_MEETINGS,
  MANAGE_JOURNEYS,
}

export interface ManageMeetingPresenceComponentEntry {
  mode: Modes;
  meeting?: Meeting;
  journey?: Journey;
}

interface ScoutRowData {
  nameSurname: string;
  troop: string;

  scoutObject: Scout;
  isSelected: boolean;
}

interface NormalizedPresence {
  scoutId: number;
  meetingId: number;
}

@Component({
  templateUrl: './manage-meeting-presence-modal.component.html',
  styleUrls: ['./manage-meeting-presence-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageMeetingPresenceComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  pageLoaded = false;
  pageError: HttpErrorResponse;

  allSelected = false;

  Modes = Modes;
  mode: Modes;
  meeting: Meeting;
  journey: Journey;

  scouts: ScoutRowData[];
  scoutsSelected = 0;

  // Control flow
  presentInitial = [] as Scout[];
  presenceToAdd = [] as Scout[];
  presenceToDelete = [] as Scout[];

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ManageMeetingPresenceComponent>,
    private scoutsService: ScoutsService,
    private meetingsService: MeetingsService,
    private journeysService: JourneysService,
    private changeDetector: ChangeDetectorRef,

    @Inject(MAT_DIALOG_DATA) data: ManageMeetingPresenceComponentEntry
  ) {
    this.mode = data.mode;
    this.meeting = data.meeting;
    this.journey = data.journey;
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // DATA LOADING

  fetchMeetingsData(): Observable<{
    scouts: Scout[];
    presence: NormalizedPresence[];
  }> {
    return forkJoin({
      scouts: this.scoutsService.getScouts(),
      presence: this.meetingsService.getMeetingsPresenceById(
        this.meeting.meetingId
      ),
    });
  }

  fetchJourneysData(): Observable<{
    scouts: Scout[];
    presence: NormalizedPresence[];
  }> {
    return forkJoin({
      scouts: this.scoutsService.getScouts(),
      presence: this.journeysService
        .getJourneysPresenceById(this.journey.journeyId)
        .pipe(
          map((x) =>
            x.map((item) => {
              return {
                meetingId: item.journeyId,
                scoutId: item.scoutId,
              } as NormalizedPresence;
            })
          )
        ),
    });
  }

  loadData(): void {
    let dataStream: Observable<{
      scouts: Scout[];
      presence: NormalizedPresence[];
    }> = null;

    switch (this.mode) {
      case Modes.MANAGE_MEETINGS:
        {
          dataStream = this.fetchMeetingsData();
        }
        break;
      case Modes.MANAGE_JOURNEYS:
        {
          dataStream = this.fetchJourneysData();
        }
        break;
    }

    if (dataStream) {
      dataStream.pipe(takeUntil(this.destroy$)).subscribe({
        next: (result) => {
          this.scouts = result.scouts.map((x) => {
            return {
              nameSurname: x.name + ' ' + x.surname,
              troop: x.troop.name,
              scoutObject: x,
              isSelected: false,
            } as ScoutRowData;
          });

          // Initially check those who already has the presence marked
          result.presence.forEach((p) => {
            const scout = this.scouts.find(
              (x) => x.scoutObject.scoutId === p.scoutId
            );
            this.presentInitial.push(scout.scoutObject);
            scout.isSelected = true;
          });
          this.checkAllSelected();

          this.gatherSelected();
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
  }

  // SELECTION

  toggleSelected(scout: ScoutRowData): void {
    this.managePresence(scout.scoutObject, scout.isSelected);
    scout.isSelected = !scout.isSelected;

    this.gatherSelected();
    this.checkAllSelected();
    this.changeDetector.detectChanges();
  }

  checkAllSelected(): void {
    this.allSelected = this.scouts.filter((x) => !x.isSelected).length === 0;
    this.changeDetector.detectChanges();
  }

  toggleSelectAll(value: boolean): void {
    this.allSelected = value;
    this.scouts.forEach((x) => {
      this.allSelected
        ? this.manageAddPresenceForall(x.scoutObject, x.isSelected)
        : this.manageDeletePresenceForall(x.scoutObject, x.isSelected);

      x.isSelected = this.allSelected;
    });
    this.gatherSelected();
    this.changeDetector.detectChanges();

    console.log(this.presenceToAdd);
    console.log(this.presenceToDelete);
  }

  gatherSelected(): void {
    this.scoutsSelected = this.scouts.filter((x) => x.isSelected).length;
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  // CONTROL FLOW

  manageAddPresenceForall(scout: Scout, isSelected: boolean): void {
    if (!isSelected) {
      this.addPresence(scout);
    }
  }

  manageDeletePresenceForall(scout: Scout, isSelected: boolean): void {
    if (isSelected) {
      this.removePresence(scout);
    }
  }

  managePresence(scout: Scout, isSelected: boolean): void {
    isSelected ? this.removePresence(scout) : this.addPresence(scout);
  }

  private addPresence(scout: Scout): void {
    if (!this.presenceToAdd.find((x) => x.scoutId === scout.scoutId)) {
      this.presenceToAdd.push(scout);
      this.presenceToDelete = this.presenceToDelete.filter(
        (x) => x.scoutId !== scout.scoutId
      );
    }

    this.changeDetector.detectChanges();
  }

  private removePresence(scout: Scout): void {
    if (!this.presenceToDelete.find((x) => x.scoutId === scout.scoutId)) {
      this.presenceToDelete.push(scout);
      this.presenceToAdd = this.presenceToAdd.filter(
        (x) => x.scoutId !== scout.scoutId
      );
    }

    this.changeDetector.detectChanges();
  }

  action(): void {
    const queue = [] as Observable<boolean>[];

    // Queue add requests up
    this.presenceToAdd.forEach((x) => {
      queue.push(
        this.mode === Modes.MANAGE_MEETINGS
          ? this.meetingsService.addMeetingPresence(
              this.meeting.meetingId,
              x.scoutId
            )
          : this.journeysService.addJourneyPresence(
              this.journey.journeyId,
              x.scoutId
            )
      );
    });

    // Queue delete requests up
    this.presenceToDelete.forEach((x) => {
      queue.push(
        this.mode === Modes.MANAGE_MEETINGS
          ? this.meetingsService.deleteMeetingPresence(
              this.meeting.meetingId,
              x.scoutId
            )
          : this.journeysService.deleteJourneyPresence(
              this.journey.journeyId,
              x.scoutId
            )
      );
    });

    new ProgressModal(this.dialog)
      .open(queue, {
        successMessage: 'Udało się zaktualizować funkcje harcerza',
        failureMessage: 'Nie udało się zaktualizować funkcji harcerza',
      })
      .then((x) =>
        x
          .afterClosed()
          .pipe(takeUntil(this.destroy$))
          .subscribe((result) => {
            if (result === Results.SUCCESS) {
              this.dialogRef.close(result);
            }
          })
      );
  }
}
