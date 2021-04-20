import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShowScoutsModal } from 'src/app/modals/common/show-scouts-modal/show-scouts-modal';
import { AddEditMeetigModal } from 'src/app/modals/meetings/add-edit-meeting-modal/add-edit-meeting-modal';
import { DeleteMeetingModal } from 'src/app/modals/meetings/delete-meeting-modal/delete-meeting-modal';
import { ManageMeetingPresenceModal } from 'src/app/modals/meetings/manage-presence-modal/manage-meeting-presence-modal';
import { Meeting, MeetingPresence } from 'src/app/model/Meeting';
import { Scout } from 'src/app/model/Scout';
import { MeetingsService } from 'src/app/services/meetings.service';
import { ScoutsService } from 'src/app/services/scouts.service';
import { DropdownAction } from 'src/app/utils/DropdownAction';
import { Results } from 'src/app/utils/Result';

interface MeetingRowData {
  title: string;
  place: string;
  date: Date;
  scoutsPresent: Scout[];

  isSelected: boolean;
  meetingData: Meeting;
}

enum Actions {
  ADD,
  PRESENCE,
  EDIT,
  DELETE,
}

@Component({
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  pageLoaded = false;
  pageError: HttpErrorResponse;

  allSelected = false;

  scouts: Scout[];
  presence: MeetingPresence[];
  meetingsData: MeetingRowData[];

  actions = new Map<Actions, DropdownAction>();

  constructor(
    private meetingsService: MeetingsService,
    private scoutsService: ScoutsService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // LOADING DATA

  loadData(): void {
    this.allSelected = false;

    forkJoin({
      scouts: this.scoutsService.getScouts(),
      meetings: this.meetingsService.getMeetings(),
      presence: this.meetingsService.getMeetingsPresence(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.scouts = result.scouts;
          this.presence = result.presence;
          this.meetingsData = result.meetings.map((x) => {
            return {
              title: x.title,
              place: x.place,
              date: x.date,
              scoutsPresent: this.scouts.filter((s) =>
                this.presence.find(
                  (p) => p.meetingId === x.meetingId && p.scoutId === s.scoutId
                )
              ),

              meetingData: x,
              isSelected: false,
            } as MeetingRowData;
          });

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

  // SELECTION

  toggleSelected(meeting: MeetingRowData): void {
    meeting.isSelected = !meeting.isSelected;

    this.checkAllSelected();
    this.changeDetector.detectChanges();
  }

  checkAllSelected(): void {
    this.allSelected =
      this.meetingsData.filter((x) => !x.isSelected).length === 0;
    this.changeDetector.detectChanges();
  }

  toggleSelectAll(value: boolean): void {
    this.allSelected = value;
    this.meetingsData.forEach((x) => (x.isSelected = this.allSelected));
    this.changeDetector.detectChanges();
  }

  // ACTIONS FACTORY

  setActions(): void {
    const selected = this.meetingsData.filter((x) => x.isSelected);
    this.actions.clear();

    this.actions.set(Actions.ADD, {
      label: 'Dodaj',
      isEnabled: true,
      action: () => this.openAddMeeting(),
    });

    this.actions.set(Actions.PRESENCE, {
      label: 'Obecność',
      isEnabled: selected.length === 1,
      action: () => this.openManagePresence(),
    });

    this.actions.set(Actions.EDIT, {
      label: 'Edytuj',
      isEnabled: selected.length === 1,
      action: () => this.openEditMeeting(),
    });

    this.actions.set(Actions.DELETE, {
      label: 'Usuń',
      isEnabled: selected.length >= 1,
      action: () => this.openDeleteMeeting(),
    });
  }

  openAddMeeting(): void {
    new AddEditMeetigModal(this.dialog).openAdd().then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  openEditMeeting(): void {
    const selected = this.meetingsData
      .filter((x) => x.isSelected)
      .map((x) => x.meetingData);

    new AddEditMeetigModal(this.dialog).openEdit(selected[0]).then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  openManagePresence(): void {
    const selected = this.meetingsData
      .filter((x) => x.isSelected)
      .map((x) => x.meetingData);

    new ManageMeetingPresenceModal(this.dialog).open(selected[0]).then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  openDeleteMeeting(): void {
    const selected = this.meetingsData
      .filter((x) => x.isSelected)
      .map((x) => x.meetingData);

    new DeleteMeetingModal(this.dialog).open(selected).then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  // DETAILS

  openShowScoutsByLink(scouts: Scout[]): void {
    new ShowScoutsModal(this.dialog).open(scouts).then((x) =>
      x.afterClosed().subscribe(() => {
        this.loadData();
      })
    );
  }
}
