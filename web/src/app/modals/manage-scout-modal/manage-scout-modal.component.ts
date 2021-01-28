import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin, Observable, Subject } from 'rxjs';
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
import { ModalsService } from '../modals.service';

@Component({
  selector: 'app-manage-scouts-modal',
  templateUrl: './manage-scout-modal.component.html',
  styleUrls: ['./manage-scout-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ManageScoutModalComponent implements OnInit {
  mode!: PageModes;

  result$ = new Subject<Result>();

  form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    pesel: ['', Validators.pattern(/\d{11}/)],
    birthDate: ['', Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)],

    address: [''],
    postalCode: ['', Validators.pattern(/\d{2}-\d{3}/)],
    city: [''],

    contact: ['', Validators.pattern(/\d{3}-\d{3}-\d{3}/)],

    troop: ['', Validators.required],
    rank: ['', Validators.required],
    instructorRank: ['', Validators.required],
  });

  // Additional data holders (controlForm holds only a string)
  troopData!: Troop | undefined;
  rankData!: Rank | undefined;
  instructorRankData!: InstruktorRank | undefined;

  scoutRoles = [] as Role[];
  allRoles = [] as Role[];
  availableRoles = [] as Role[];
  availableTroops = [] as Troop[];
  availableRanks = [] as Rank[];
  availableInstructorRanls = [] as InstruktorRank[];

  pageLoaded = false;

  @ViewChild('content')
  public content!: TemplateRef<any>;

  constructor(
    private modal: ModalsService,
    private fb: FormBuilder,
    private rolesService: RolesService,
    private troopsService: TroopsService,
    private ranksService: RanksService,
    private scoutsService: ScoutsService
  ) {}

  ngOnInit(): void {
    forkJoin({
      roles: this.rolesService.getRoles(),
      troops: this.troopsService.getTroops(),
      ranks: this.ranksService.getRanks(),
      instructorRanks: this.ranksService.getInstructorRanks(),
    }).subscribe((x) => {
      //
      // Load roles
      x.roles.forEach((role) => this.allRoles.push(role));

      // Load troops
      x.troops.forEach((troop) => this.availableTroops.push(troop));

      // Load ranks
      x.ranks.forEach((rank) => this.availableRanks.push(rank));

      // Load instructor ranks
      x.instructorRanks.forEach((rank) =>
        this.availableInstructorRanls.push(rank)
      );

      this.pageLoaded = true;
    });
  }

  // INIT

  resetForm(): void {
    this.form.reset();
    this.pageLoaded = false;
    this.troopData = undefined;
    this.rankData = undefined;
    this.instructorRankData = undefined;
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
    this.availableRoles = this.allRoles.filter(
      (role) => !this.scoutRoles.includes(role)
    );
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
    this.resetForm();
    this.mode = mode;
    this.modal.open(this.content);
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
    this.modal.close();
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
