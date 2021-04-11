import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Meeting } from 'src/app/model/Meeting';
import { MeetingsService } from 'src/app/services/meetings.service';
import { DropdownAction } from 'src/app/utils/DropdownAction';

interface MeetingRowData {
  title: string;
  place: string;
  date: Date;

  isSelected: boolean;
  meetingData: Meeting;
}

enum Actions {
  ADD,
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

  meetingsData: MeetingRowData[];

  actions = new Map<Actions, DropdownAction>();

  constructor(
    private meetingsService: MeetingsService,
    private changeDetector: ChangeDetectorRef
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
      meetings: this.meetingsService.getMeetings(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.meetingsData = result.meetings.map((x) => {
            return {
              title: x.title,
              place: x.place,
              date: x.date,

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
    // const selected = this.teams.filter((x) => x.isSelected);
    const selected = [];
    this.actions.clear();

    this.actions.set(Actions.ADD, {
      label: 'Dodaj',
      isEnabled: true,
      action: () => {},
    });

    this.actions.set(Actions.EDIT, {
      label: 'Edytuj',
      isEnabled: selected.length === 1,
      action: () => {},
    });

    this.actions.set(Actions.DELETE, {
      label: 'Usuń',
      isEnabled: selected.length >= 1,
      action: () => {},
    });
  }
}
