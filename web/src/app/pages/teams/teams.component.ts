import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressModal } from 'src/app/modals/common/progress-modal/ProgressModal';
import { Team } from 'src/app/model/Team';
import { hideWithTimeout, Result, ResultOld } from 'src/app/utils/Result';
import { TeamsService } from '../../services/teams.service';

interface TeamDataRow {
  name: string;
  patron?: string;

  teamObject: Team;
  isSelected: boolean;
}

enum Actions {
  EDIT,
  DELETE,
}

interface DropdownAction {
  label: string;
  isEnabled: boolean;
  action: () => void;
}

@Component({
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  pageLoaded = false;
  pageError: HttpErrorResponse;

  form: FormGroup;
  actions = new Map<Actions, DropdownAction>();

  // Selection
  allSelected = false;

  teams = [] as TeamDataRow[];

  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.setupForm();
    this.loadData();
  }

  // DATA LOADING

  loadData(): void {
    this.pageLoaded = false;
    this.teamsService
      .getUserTeams()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (teams) => {
          this.teams = teams.map((x) => {
            return {
              name: x.name,
              patron: x.patron,
              isSelected: false,
              teamObject: x,
            } as TeamDataRow;
          });

          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
        error: (err) => {
          this.pageLoaded = true;
          this.pageError = err;
          this.changeDetector.detectChanges();
        },
      });
  }

  // ACTIONS FACTORY

  setActions(): void {
    const selected = this.teams.filter((x) => x.isSelected);
    this.actions.clear();

    this.actions.set(Actions.EDIT, {
      label: 'Edytuj',
      isEnabled: selected.length === 1,
      action: () => {
        // TODO: Dać akcję edit
        console.log('Edit');
      },
    });

    this.actions.set(Actions.DELETE, {
      label: 'Delete',
      isEnabled: selected.length >= 1,
      action: () => {
        // TODO: Dać akcję Delete
        console.log('Delete');
      },
    });
  }

  // SELECTION

  toggleSelected(team: TeamDataRow): void {
    team.isSelected = !team.isSelected;

    this.checkAllSelected();
    this.changeDetector.detectChanges();
  }

  checkAllSelected(): void {
    this.allSelected = this.teams.filter((x) => !x.isSelected).length === 0;
    this.changeDetector.detectChanges();
  }

  toggleSelectAll(value: boolean): void {
    console.log(value);
    this.allSelected = value;
    this.teams.forEach((x) => (x.isSelected = this.allSelected));
    this.changeDetector.detectChanges();
  }

  // FUNCTIONALITIES

  addTeam(): void {
    new ProgressModal(this.dialog)
      .open(this.teamsService.addTeam(this.name.value, this.patron.value), {
        successMessage: 'Udało się dodać drużynę',
        failureMessage: 'Nie udało się dodać drużyny',
      })
      .afterClosed()
      .subscribe((x) => {
        if (x === Result.Success) {
          this.loadData();
        }
      });
  }

  editTeam(
    teamId: number,
    teamName: string,
    teamPatron: string,
    result: Subject<ResultOld>
  ): void {
    // this.teamsService.patchTeam(teamId, teamName, teamPatron).subscribe({
    //   next: (res) => {
    //     result.next({ show: true, result: res });
    //     hideWithTimeout(result);
    //   },
    //   error: () => {
    //     result.next({ show: true, result: false });
    //     hideWithTimeout(result);
    //   },
    // });
  }

  deleteTeam(teamId: number, result: Subject<ResultOld>): void {
    // this.teamsService.deleteTeam(teamId).subscribe({
    //   next: (res) => {
    //     result.next({ show: true, result: res });
    //     hideWithTimeout(result);
    //     this.refreshPage();
    //   },
    //   error: () => {
    //     result.next({ show: true, result: false });
    //     hideWithTimeout(result);
    //   },
    // });
  }

  // FORM SETTING UP

  setupForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      patron: [''],
    });
  }

  // FORMS

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get patron(): AbstractControl {
    return this.form.get('patron');
  }

  teamGroup(index: number): FormGroup {
    return this.form[index].formGroup;
  }
}
