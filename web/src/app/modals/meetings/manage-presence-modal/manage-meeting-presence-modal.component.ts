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
import { Sort } from '@angular/material/sort';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Journey } from 'src/app/model/data/Journey';
import { Meeting } from 'src/app/model/data/Meeting';
import { Scout } from 'src/app/model/data/Scout';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { JourneysService } from 'src/app/services/data/journeys.service';
import { MeetingsService } from 'src/app/services/data/meetings.service';
import { ScoutsService } from 'src/app/services/data/scouts.service';
import { SortService } from 'src/app/services/tools/sort.service';
import { Results } from 'src/app/utils/Result';
import { EntryRequestData } from '../../common/progress-modal/progress-modal.component';
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
  scoutsInitial: ScoutRowData[];
  scoutsFiltered: ScoutRowData[];

  searchPhrase: string;
  filterKeys = ['nameSurname', 'troop'];

  scoutsSelected = 0;

  // Control flow
  presentInitial = [] as Scout[];
  presenceToAdd = [] as Scout[];
  presenceToDelete = [] as Scout[];

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ManageMeetingPresenceComponent>,
    private scoutsService: ScoutsService,
    private sortService: SortService,
    private searchPipe: SearchPipe,
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
              troop: x.patrol.name,
              scoutObject: x,
              isSelected: false,
            } as ScoutRowData;
          });

          this.scoutsInitial = this.scouts.slice();
          this.filterData();

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
  }

  gatherSelected(): void {
    this.scoutsSelected = this.scouts.filter((x) => x.isSelected).length;
  }

  // SORTING

  sortData(sort: Sort): void {
    this.scouts = this.sortService.sort(this.scoutsInitial, sort);
    this.filterData();
  }

  // FILTERING

  onFilterChange(searchPhrase: string): void {
    this.searchPhrase = searchPhrase;
    this.filterData();
  }

  filterData(): void {
    this.scoutsFiltered = this.searchPipe.transform(
      this.scouts,
      this.filterKeys,
      this.searchPhrase ? this.searchPhrase : ''
    );
    this.changeDetector.detectChanges();
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
    const queue = [] as EntryRequestData[];

    // Queue add requests up
    this.presenceToAdd.forEach((x) => {
      queue.push(
        this.mode === Modes.MANAGE_MEETINGS
          ? {
              request: this.meetingsService.addMeetingPresence(
                this.meeting.meetingId,
                x.scoutId
              ),
              requestLabel: 'requests.add-journey-presence',
            }
          : {
              request: this.journeysService.addJourneyPresence(
                this.journey.journeyId,
                x.scoutId
              ),
              requestLabel: 'requests.delete-journey-presence',
            }
      );
    });

    // Queue delete requests up
    this.presenceToDelete.forEach((x) => {
      queue.push(
        this.mode === Modes.MANAGE_MEETINGS
          ? {
              request: this.meetingsService.deleteMeetingPresence(
                this.meeting.meetingId,
                x.scoutId
              ),
              requestLabel: 'requests.add-meeting-presence',
            }
          : {
              request: this.journeysService.deleteJourneyPresence(
                this.journey.journeyId,
                x.scoutId
              ),
              requestLabel: 'requests.delete-meeting-presence',
            }
      );
    });

    new ProgressModal(this.dialog).open(queue).then((x) =>
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
