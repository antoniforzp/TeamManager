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
import { AddEditJourneyModal } from 'src/app/modals/meetings/add-edit-journey-modal/add-edit-journey-modal';
import { AddEditMeetigModal as AddEditMeetingModal } from 'src/app/modals/meetings/add-edit-meeting-modal/add-edit-meeting-modal';
import { DeleteMeetingModal } from 'src/app/modals/meetings/delete-meeting-modal/delete-meeting-modal';
import { ExportCsvMeetingJourneyModal } from 'src/app/modals/meetings/export-csv-meeting-journey-modal/export-csv-meeting-journey-modal';
import { ManageMeetingPresenceModal } from 'src/app/modals/meetings/manage-presence-modal/manage-meeting-presence-modal';
import { Modes } from 'src/app/modals/meetings/manage-presence-modal/manage-meeting-presence-modal.component';
import { Journey, JourneyPresence } from 'src/app/model/Journey';
import { Meeting, MeetingPresence } from 'src/app/model/Meeting';
import { Scout } from 'src/app/model/Scout';
import { MeetingJourneyTypes } from 'src/app/model/Indicators';
import { DropdownAction } from 'src/app/utils/DropdownAction';
import { Results } from 'src/app/utils/Result';
import { JourneysService } from 'src/app/services/data/journeys.service';
import { MeetingsService } from 'src/app/services/data/meetings.service';
import { ScoutsService } from 'src/app/services/data/scouts.service';

interface MeetingJourneyRowData {
  title: string;
  place: string;
  date: Date;
  endDate?: Date;
  scoutsPresent: Scout[];

  isSelected: boolean;
  data?: Meeting | Journey;
  type: MeetingJourneyTypes;
}

enum Actions {
  ADD_MEETING,
  ADD_JOURNEY,
  PRESENCE,
  EDIT,
  DELETE,
  EXPORT_CSV,
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
  meetingsPresence: MeetingPresence[];
  journeysPresence: JourneyPresence[];
  meetingsJourneysData: MeetingJourneyRowData[] = [];

  Types = MeetingJourneyTypes;

  actions = new Map<Actions, DropdownAction>();

  constructor(
    private meetingsService: MeetingsService,
    private journeysSerice: JourneysService,
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
      meetingsPresence: this.meetingsService.getMeetingsPresence(),
      journeys: this.journeysSerice.getJourneys(),
      journeysPresence: this.journeysSerice.getJourneysPresence(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.scouts = result.scouts;
          this.meetingsJourneysData = [];

          this.meetingsPresence = result.meetingsPresence;
          this.meetingsJourneysData = this.meetingsJourneysData.concat(
            this.assemblyMeetingData(result.meetings)
          );

          this.journeysPresence = result.journeysPresence;
          this.meetingsJourneysData = this.meetingsJourneysData.concat(
            this.assemblyJourneyData(result.journeys)
          );

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

  assemblyMeetingData(meetings: Meeting[]): MeetingJourneyRowData[] {
    return (this.meetingsJourneysData = meetings.map((x) => {
      return {
        title: x.title,
        place: x.place,
        date: x.date,
        scoutsPresent: this.scouts.filter((s) =>
          this.meetingsPresence.find(
            (p) => p.meetingId === x.meetingId && p.scoutId === s.scoutId
          )
        ),

        type: MeetingJourneyTypes.MEETING,
        data: x,
        isSelected: false,
      } as MeetingJourneyRowData;
    }));
  }

  assemblyJourneyData(journys: Journey[]): MeetingJourneyRowData[] {
    return (this.meetingsJourneysData = journys.map((x) => {
      return {
        title: x.title,
        place: x.place,
        date: x.startDate,
        endDate: x.endDate,
        scoutsPresent: this.scouts.filter((s) =>
          this.journeysPresence.find(
            (p) => p.journeyId === x.journeyId && p.scoutId === s.scoutId
          )
        ),

        type: MeetingJourneyTypes.JOURNEY,
        data: x,
        isSelected: false,
      } as MeetingJourneyRowData;
    }));
  }

  // SELECTION

  toggleSelected(row: MeetingJourneyRowData): void {
    row.isSelected = !row.isSelected;

    this.checkAllSelected();
    this.changeDetector.detectChanges();
  }

  checkAllSelected(): void {
    this.allSelected =
      this.meetingsJourneysData.filter((x) => !x.isSelected).length === 0;
    this.changeDetector.detectChanges();
  }

  toggleSelectAll(value: boolean): void {
    this.allSelected = value;
    this.meetingsJourneysData.forEach((x) => (x.isSelected = this.allSelected));
    this.changeDetector.detectChanges();
  }

  // ACTIONS FACTORY

  setActions(): void {
    const selected = this.meetingsJourneysData.filter((x) => x.isSelected);
    this.actions.clear();

    this.actions.set(Actions.ADD_MEETING, {
      label: 'Dodaj zbiórkę',
      isEnabled: true,
      action: () => this.openAddMeeting(),
    });

    this.actions.set(Actions.ADD_JOURNEY, {
      label: 'Dodaj wyjazd',
      isEnabled: true,
      action: () => this.openAddJourney(),
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

    this.actions.set(Actions.EXPORT_CSV, {
      label: 'Exportuj do CSV',
      isEnabled: selected.length >= 1,
      action: () => this.openExportCsvMeeting(),
    });
  }

  openAddMeeting(): void {
    new AddEditMeetingModal(this.dialog).openAdd().then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  openAddJourney(): void {
    new AddEditJourneyModal(this.dialog).openAdd().then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  openEditMeeting(): void {
    const selected = this.meetingsJourneysData.filter((x) => x.isSelected);

    if (selected[0].type === MeetingJourneyTypes.MEETING) {
      new AddEditMeetingModal(this.dialog)
        .openEdit(selected[0].data as Meeting)
        .then((x) =>
          x.afterClosed().subscribe((result) => {
            if (result === Results.SUCCESS) {
              this.loadData();
            }
          })
        );
    } else if (selected[0].type === MeetingJourneyTypes.JOURNEY) {
      new AddEditJourneyModal(this.dialog)
        .openEdit(selected[0].data as Journey)
        .then((x) =>
          x.afterClosed().subscribe((result) => {
            if (result === Results.SUCCESS) {
              this.loadData();
            }
          })
        );
    }
  }

  openManagePresence(): void {
    const selected = this.meetingsJourneysData.filter((x) => x.isSelected);

    let options = {} as { meeting?: Meeting; journey?: Journey };
    let mode: Modes;

    if (selected[0].type === this.Types.MEETING) {
      options = {
        meeting: selected[0].data as Meeting,
      };
      mode = Modes.MANAGE_MEETINGS;
    } else if (selected[0].type === this.Types.JOURNEY) {
      options = {
        journey: selected[0].data as Journey,
      };
      mode = Modes.MANAGE_JOURNEYS;
    }

    new ManageMeetingPresenceModal(this.dialog).open(options, mode).then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  openDeleteMeeting(): void {
    const selected = this.meetingsJourneysData.filter((x) => x.isSelected);

    if (selected[0].type === MeetingJourneyTypes.MEETING) {
      new DeleteMeetingModal(this.dialog)
        .open({
          meetings: selected
            .filter((x) => x.type === this.Types.MEETING)
            .map((x) => x.data) as Meeting[],
          journeys: selected
            .filter((x) => x.type === this.Types.JOURNEY)
            .map((x) => x.data) as Journey[],
        })
        .then((x) =>
          x.afterClosed().subscribe((result) => {
            if (result === Results.SUCCESS) {
              this.loadData();
            }
          })
        );
    }
  }

  openExportCsvMeeting(): void {
    const selected = this.meetingsJourneysData.filter((x) => x.isSelected);

    new ExportCsvMeetingJourneyModal(this.dialog)
      .open({
        meetings: selected
          .filter((x) => x.type === MeetingJourneyTypes.MEETING)
          .map((x) => x.data as Meeting),
        journeys: selected
          .filter((x) => x.type === MeetingJourneyTypes.JOURNEY)
          .map((x) => x.data as Journey),
      })
      .then((x) =>
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
