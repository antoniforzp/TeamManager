import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, Observable, Subject } from 'rxjs';
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
import { hideWithTimeout, Result } from 'src/app/utils/Result';
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

  scoutRoles = [] as Role[];
  availableRoles = [] as Role[];

  allRoles$ = new Subject<Role[]>();
  allTroops$ = new Subject<Troop[]>();
  allRanks$ = new Subject<Rank[]>();
  allInstructorRanks$ = new Subject<InstruktorRank[]>();

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
    public dialogRef: MatDialogRef<ManageScoutModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManageScoutDialogData
  ) {}

  ngOnInit(): void {
    this.birthDate.valueChanges.subscribe(console.log);

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
    this.troop.setValue(troop.name);
    this.troopData = troop;
  }

  clearTroop(): void {
    this.troop.setValue(undefined);
    this.troopData = undefined;
  }

  // ROLES

  filterRoles(): void {
    // this.availableRoles = this.allRoles.filter(
    //   (role) => !this.scoutRoles.includes(role)
    // );
  }

  addRole(role: Role): void {
    this.scoutRoles.push(role);
  }

  removeRole(role: Role): void {
    const index = this.scoutRoles.indexOf(role);
    if (index > -1) {
      this.scoutRoles.splice(index, 1);
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

  public async open(mode: PageModes): Promise<any> {
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
        let operation: Observable<boolean> | null = null;
        switch (this.mode) {
          case PageModes.Add:
            {
              operation = this.scoutsService.addScout(newScout);
            }
            break;
          case PageModes.Edit:
            {
              // operation = this.scoutsService.editcout(newScout);
            }
            break;
        }
        if (operation) {
          operation.subscribe({
            next: (res) => {
              this.result$.next({
                show: true,
                result: res,
              });
              hideWithTimeout(this.result$);
            },
            error: () => {
              this.result$.next({
                show: true,
                result: false,
              });
              hideWithTimeout(this.result$);
            },
          });
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
