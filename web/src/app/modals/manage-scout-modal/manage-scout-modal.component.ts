import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { InstruktorRank } from 'src/app/model/InstructorRank';
import { Rank } from 'src/app/model/Rank';
import { Scout } from 'src/app/model/Scout';
import { Troop } from 'src/app/model/Troop';
import { RanksService } from 'src/app/services/ranks.service';
import { ScoutsService } from 'src/app/services/scouts.service';
import { TroopsService } from 'src/app/services/troops.service';
import { PageModes } from 'src/app/utils/PageModes';
import { Result } from 'src/app/utils/Result';
import { ProgressModal } from '../common/progress-modal/ProgressModal';
export interface ManageScoutDialogData {
  mode: PageModes;
  scoutId?: number;
}

@Component({
  selector: 'app-manage-scouts-modal',
  templateUrl: './manage-scout-modal.component.html',
  styleUrls: ['./manage-scout-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ManageScoutModalComponent implements OnInit {
  mode!: PageModes;
  PageModes = PageModes;

  result$ = new Subject<Result>();

  form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    pesel: ['', Validators.pattern(/\d{11}/)],
    birthDate: [''],

    address: [''],
    postalCode: ['', Validators.pattern(/\d{2}-\d{3}/)],
    city: [''],

    contact: ['', Validators.pattern(/\d{3}-\d{3}-\d{3}/)],

    troop: ['', Validators.required],
    rank: ['', Validators.required],
    instructorRank: ['', Validators.required],
  });

  allTroops$ = new BehaviorSubject<Troop[]>([]);
  allRanks$ = new BehaviorSubject<Rank[]>([]);
  allInstructorRanks$ = new BehaviorSubject<InstruktorRank[]>([]);

  troopsNames = [] as string[];

  pageLoaded = false;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  // To edit
  scoutId!: number;

  constructor(
    private fb: FormBuilder,
    private troopsService: TroopsService,
    private ranksService: RanksService,
    private scoutsService: ScoutsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ManageScoutModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManageScoutDialogData
  ) {
    this.mode = data.mode;
    if (this.mode === PageModes.Edit && data.scoutId) {
      this.scoutId = data.scoutId;
    }
  }

  ngOnInit(): void {
    //
    forkJoin({
      troops: this.troopsService.getTroops(),
      ranks: this.ranksService.getRanks(),
      instructorRanks: this.ranksService.getInstructorRanks(),
      scouts: this.scoutsService.getScouts(),
    }).subscribe((x) => {
      this.allTroops$.next(x.troops);
      this.allRanks$.next(x.ranks);
      this.allInstructorRanks$.next(x.instructorRanks);

      const scout = x.scouts.find((s) => s.scoutId === this.scoutId);
      if (this.mode === PageModes.Edit && scout) {
        this.patchScoutData(scout);
      }

      this.pageLoaded = true;
    });
  }

  // INIT

  resetForm(): void {
    this.form.reset();
    this.pageLoaded = false;
  }

  patchScoutData(scout: Scout): void {
    this.form.patchValue({
      name: scout.name,
      surname: scout.surname,
      pesel: scout.pesel,
      birthDate: scout.birthDate,
      address: scout.address,
      postalCode: scout.postalCode,
      city: scout.city,
      contact: scout.phone,

      troop: scout.troop.name,
      rank: scout.rank.name,
      instructorRank: scout.instructorRank?.name,
    });
  }

  // FUNCTIONALITIES

  public manageScout(): void {
    if (this.form.valid) {
      const newScout = {
        scoutId: -1,
        name: this.name.value,
        surname: this.surname.value,
        pesel: this.pesel.value,
        birthDate: new Date(this.birthDate.value),
        address: this.address.value,
        postalCode: this.postalCode.value,
        city: this.city.value,
        phone: this.contact.value,
        troopId: this.troop.troopId,
        rankId: this.rank.rankId,
        instructorRankId: this.instructorRank.rankId,
      };

      if (this.mode) {
        switch (this.mode) {
          case PageModes.Add:
            {
              new ProgressModal(this.dialog)
                .open(
                  this.scoutsService.addScout(
                    newScout.name,
                    newScout.surname,
                    newScout.pesel,
                    newScout.birthDate,
                    newScout.address,
                    newScout.postalCode,
                    newScout.city,
                    newScout.phone,
                    0,
                    0,
                    0
                  ),
                  // newScout.troopId,
                  // newScout.rankId,
                  // newScout.instructorRankId
                  {
                    failureMessage:
                      'Nie udało się dodać harcerza. Sprawdź wszystkie dane.',
                  }
                )
                .then((x) =>
                  x
                    .afterClosed()
                    .subscribe((result) => this.dialogRef.close(result))
                );
            }
            break;
          case PageModes.Edit:
            {
              new ProgressModal(this.dialog)
                .open(
                  this.scoutsService.patchScout(
                    this.scoutId,
                    newScout.name,
                    newScout.surname,
                    newScout.pesel,
                    newScout.birthDate,
                    newScout.address,
                    newScout.postalCode,
                    newScout.city,
                    newScout.phone,
                    0,
                    0,
                    0
                  ),
                  // newScout.troopId,
                  // newScout.rankId,
                  // newScout.instructorRankId
                  {
                    failureMessage:
                      'Nie udało się zaktualizować dane harcerza. Sprawdź wszystkie dane.',
                  }
                )
                .then((x) =>
                  x
                    .afterClosed()
                    .subscribe((result) => this.dialogRef.close(result))
                );
            }
            break;
        }
      }
    } else {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
    }
  }

  public async close(): Promise<any> {
    this.dialogRef.close();
  }

  // FORMS

  get name(): any {
    return this.form.get('name');
  }

  get surname(): any {
    return this.form.get('surname');
  }

  get pesel(): any {
    return this.form.get('pesel');
  }

  get birthDate(): any {
    return this.form.get('birthDate');
  }

  get address(): any {
    return this.form.get('address');
  }

  get postalCode(): any {
    return this.form.get('postalCode');
  }

  get city(): any {
    return this.form.get('city');
  }

  get contact(): any {
    return this.form.get('contact');
  }

  get troop(): any {
    return this.form.get('troop');
  }

  get rank(): any {
    return this.form.get('rank');
  }

  get instructorRank(): any {
    return this.form.get('instructorRank');
  }
}
