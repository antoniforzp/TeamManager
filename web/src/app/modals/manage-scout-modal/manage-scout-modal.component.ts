import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { InstruktorRank } from 'src/app/model/InstructorRank';
import { Rank } from 'src/app/model/Rank';
import { Role } from 'src/app/model/Role';
import { Scout } from 'src/app/model/Scout';
import { Troop } from 'src/app/model/Troop';
import { RanksService } from 'src/app/services/ranks.service';
import { RolesService } from 'src/app/services/roles.service';
import { ScoutsService } from 'src/app/services/scouts.service';
import { TroopsService } from 'src/app/services/troops.service';
import { PageModes } from 'src/app/utils/PageModes';
import { Result } from 'src/app/utils/Result';
import { ProgressModal } from '../common/progress-modal/ProgressModal';
export interface ManageScoutDialogData {
  mode: PageModes;
}

@Component({
  selector: 'app-manage-scouts-modal',
  templateUrl: './manage-scout-modal.component.html',
  styleUrls: ['./manage-scout-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ManageScoutModalComponent implements OnInit {
  mode!: PageModes;

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

    role: [''],
    troop: ['', Validators.required],
    rank: ['', Validators.required],
    instructorRank: ['', Validators.required],
  });

  // Additional data holders (controlForm holds only a string)
  troopData!: Troop | undefined;
  rankData!: Rank | undefined;
  instructorRankData!: InstruktorRank | undefined;

  scoutRoles$ = new BehaviorSubject<Role[]>([]);
  availableRoles$ = new BehaviorSubject<Role[]>([]);

  allRoles$ = new BehaviorSubject<Role[]>([]);
  allTroops$ = new BehaviorSubject<Troop[]>([]);
  allRanks$ = new BehaviorSubject<Rank[]>([]);
  allInstructorRanks$ = new BehaviorSubject<InstruktorRank[]>([]);

  rolesNames = [] as string[];
  troopsNames = [] as string[];

  pageLoaded = false;

  @ViewChild('content')
  public content!: TemplateRef<any>;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService,
    private troopsService: TroopsService,
    private ranksService: RanksService,
    private scoutsService: ScoutsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ManageScoutModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManageScoutDialogData
  ) {
    this.mode = data.mode;
  }

  ngOnInit(): void {
    //
    forkJoin({
      roles: this.rolesService.getRoles(),
      troops: this.troopsService.getTroops(),
      ranks: this.ranksService.getRanks(),
      instructorRanks: this.ranksService.getInstructorRanks(),
    }).subscribe((x) => {
      //
      // Load troops
      this.allTroops$.next(x.troops);

      // Load roles
      this.allRoles$.next(x.roles);
      this.availableRoles$.next(x.roles);

      // Load ranks
      this.allRanks$.next(x.ranks);

      // Load instructor ranks
      this.allInstructorRanks$.next(x.instructorRanks);

      this.pageLoaded = true;
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  // INIT

  resetForm(): void {
    this.form.reset();
    this.pageLoaded = false;
    this.troopData = undefined;
    this.rankData = undefined;
    this.instructorRankData = undefined;
  }

  // AUTOFILL

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  // TROOPS

  addTroop(troop: Troop): void {
    this.troopData = troop;
  }

  clearTroop(): void {
    this.troop.setValue(undefined);
    this.troopData = undefined;
  }

  // ROLES

  addRole(newRole: Role): void {
    this.scoutRoles$.next(this.scoutRoles$.value.concat(newRole));
    this.availableRoles$.next(
      this.allRoles$.value.filter((x) => x.roleId !== newRole.roleId)
    );
    setTimeout(() => this.role.patchValue(''), 1000);
  }

  removeRole(role: Role): void {
    const index = this.scoutRoles$.value.indexOf(role);
    if (index > -1) {
      this.scoutRoles$.next(
        this.scoutRoles$.value.filter((x) => x.roleId !== role.roleId)
      );
    }
  }

  // RANK

  addRank(rank: Rank): void {
    this.rank.setValue(rank.name);
    this.rankData = rank;
  }

  removeRank(): void {
    this.rank.setValue(undefined);
    this.rankData = undefined;
  }

  // INSTRUCTOR RANK

  addInstructorRank(rank: InstruktorRank): void {
    this.instructorRank.setValue(rank.name);
    this.instructorRankData = rank;
  }

  removeInstructorRank(): void {
    this.instructorRank.setValue(undefined);
    this.instructorRankData = undefined;
  }

  // FUNCTIONALITIES

  public async open(): Promise<any> {
    // this.resetForm();
    // this.mode = mode;
    // this.modal.open(this.content);
  }

  public manageScout(): void {
    if (this.form.valid) {
      const newScout = {
        scoutId: -1,
        name: this.name.value,
        surname: this.surname.value,
        pesel: this.pesel.value,
        birthDate: this.birthDate.value
          ? new Date(this.birthDate.value)
          : undefined,
        address: this.address.value,
        postalCode: this.postalCode.value,
        city: this.city.value,
        phone: this.contact.value,

        troop: this.troopData,
        rank: this.rankData,
        instructorRank: this.instructorRankData,
      } as Scout;

      if (this.mode) {
        switch (this.mode) {
          case PageModes.Add:
            {
              new ProgressModal(this.dialog)
                .open(this.scoutsService.addScout(newScout), {
                  failureMessage:
                    'Nie udało się dodać harcerza. Sprawdź wszystkie dane.',
                })
                .afterClosed()
                .subscribe((x) => this.dialogRef.close(x));
            }
            break;
          case PageModes.Edit:
            {
              // operation = this.scoutsService.editcout(newScout);
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
    this.dialogRef.close('Pizza!');
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

  get role(): any {
    return this.form.get('role');
  }

  get rank(): any {
    return this.form.get('rank');
  }

  get instructorRank(): any {
    return this.form.get('instructorRank');
  }
}
