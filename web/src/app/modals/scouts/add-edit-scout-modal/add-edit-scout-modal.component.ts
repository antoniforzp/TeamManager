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
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InstructorRank } from 'src/app/model/InstructorRank';
import { Rank } from 'src/app/model/Rank';
import { Role } from 'src/app/model/Role';
import { Scout } from 'src/app/model/Scout';
import { Team } from 'src/app/model/Team';
import { Troop } from 'src/app/model/Troop';
import { RanksService } from 'src/app/services/ranks.service';
import { RolesService } from 'src/app/services/roles.service';
import { ScoutPayload, ScoutsService } from 'src/app/services/scouts.service';
import { TeamsService } from 'src/app/services/teams.service';
import { TroopsService } from 'src/app/services/troops.service';
import { RegexPatterns } from 'src/app/utils/PatternsDefs';
import { Results as Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';
import { ModalModes } from '../../Modals-def';

export interface AddEditScoutModalComponentEntry {
  mode: ModalModes;
  scoutData?: Scout;
}

@Component({
  templateUrl: './add-edit-scout-modal.component.html',
  styleUrls: ['./add-edit-scout-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditScoutModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  pageLoaded = false;
  pageError: HttpErrorResponse;

  ModalModes = ModalModes;
  modalMode: ModalModes;

  form: FormGroup;
  anchorScoutId: number;
  scoutData: Scout;

  roles = [] as Role[];
  troops = [] as Troop[];
  ranks = [] as Rank[];
  instructorRanks = [] as InstructorRank[];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditScoutModalComponent>,
    private scoutService: ScoutsService,
    private rolesService: RolesService,
    private troopsService: TroopsService,
    private ranksService: RanksService,
    private changeDetector: ChangeDetectorRef,

    @Inject(MAT_DIALOG_DATA) data: AddEditScoutModalComponentEntry
  ) {
    this.scoutData = data.scoutData;
    this.modalMode = data.mode;
    this.anchorScoutId = data.scoutData?.scoutId;
  }

  ngOnInit(): void {
    forkJoin({
      roles: this.rolesService.getRoles(),
      troops: this.troopsService.getTroops(),
      ranks: this.ranksService.getRanks(),
      instructorRanks: this.ranksService.getInstructorRanks(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.roles = result.roles;
          this.troops = result.troops;
          this.ranks = result.ranks;
          this.instructorRanks = result.instructorRanks;

          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
        error: (err) => {
          this.pageError = err;
          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
      });

    this.setupForm();

    if (this.scoutData) {
      this.patchForm(this.scoutData);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  addScout(): void {
    const scoutPayload = {
      name: this.name.value,
      surname: this.surname.value,
      birthDate: new Date(this.birthDate.value),
      pesel: this.pesel.value,
      address: this.address.value,
      postalCode: this.postalCode.value,
      city: this.city.value,
      phone: this.phone.value,
      troopId: this.troop.value,
      rankId: this.rank.value,
      instructorRankId: this.instructorRank.value,
    } as ScoutPayload;

    new ProgressModal(this.dialog)
      .open([this.scoutService.addScout(scoutPayload)], {
        successMessage: 'Udało się dodać harcerza',
        failureMessage: 'Nie udało się dodać harcerza',
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

  editScout(): void {
    const scoutPayload = {
      name: this.name.value,
      surname: this.surname.value,
      birthDate: new Date(this.birthDate.value),
      pesel: this.pesel.value,
      address: this.address.value,
      postalCode: this.postalCode.value,
      city: this.city.value,
      phone: this.phone.value,
      troopId: this.troop.value,
      rankId: this.rank.value,
      instructorRankId: this.instructorRank.value,
    } as ScoutPayload;

    new ProgressModal(this.dialog)
      .open([this.scoutService.patchScout(this.anchorScoutId, scoutPayload)], {
        successMessage: 'Udało się zaktualizować informacje harcerza',
        failureMessage: 'Nie udało się zaktualizować informacji harcerza',
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

  // UTILS

  createInstructorRankBadge(rank: Rank): string {
    return 'instructor-rank-' + rank.rankId;
  }

  // FORM SETTING UP

  setupForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      pesel: ['', [Validators.pattern(new RegExp(RegexPatterns.PESEL))]],
      birthDate: [''],
      address: [''],
      postalCode: [
        '',
        [Validators.pattern(new RegExp(RegexPatterns.POSTAL_CODE))],
      ],
      city: [''],
      phone: ['', [Validators.pattern(new RegExp(RegexPatterns.PHONE_NUMBER))]],
      troop: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      instructorRank: ['', [Validators.required]],
    });
  }

  patchForm(scout: Scout): void {
    this.form.patchValue({
      name: scout.name,
      surname: scout.surname,
      pesel: scout.pesel,
      birthDate: scout.birthDate,
      address: scout.address,
      postalCode: scout.postalCode,
      city: scout.city,
      phone: scout.phone,
      troop: scout.troop.troopId,
      rank: scout.rank.rankId,
      instructorRank: scout.instructorRank.rankId,
    });
  }

  // FROMS

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get surname(): AbstractControl {
    return this.form.get('surname');
  }

  get pesel(): AbstractControl {
    return this.form.get('pesel');
  }

  get birthDate(): AbstractControl {
    return this.form.get('birthDate');
  }

  get address(): AbstractControl {
    return this.form.get('address');
  }

  get postalCode(): AbstractControl {
    return this.form.get('postalCode');
  }

  get city(): AbstractControl {
    return this.form.get('city');
  }

  get phone(): AbstractControl {
    return this.form.get('phone');
  }

  get troop(): AbstractControl {
    return this.form.get('troop');
  }

  get rank(): AbstractControl {
    return this.form.get('rank');
  }

  get instructorRank(): AbstractControl {
    return this.form.get('instructorRank');
  }
}
