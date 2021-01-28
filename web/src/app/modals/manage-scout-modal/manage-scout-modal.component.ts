import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { InstruktorRank } from 'src/app/model/InstructorRank';
import { Rank } from 'src/app/model/Rank';
import { Role } from 'src/app/model/Role';
import { Troop } from 'src/app/model/Troop';
import { RanksService } from 'src/app/services/ranks.service';
import { RolesService } from 'src/app/services/roles.service';
import { TroopsService } from 'src/app/services/troops.service';
import { PageModes } from 'src/app/utils/PageModes';
import { ModalsService } from '../modals.service';

@Component({
  selector: 'app-manage-scouts-modal',
  templateUrl: './manage-scout-modal.component.html',
  styleUrls: ['./manage-scout-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ManageScoutModalComponent implements OnInit {
  mode$ = new Subject<PageModes>();

  form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    pesel: ['', Validators.pattern(/\d{11}/)],
    birthDate: ['', Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)],

    address: [''],
    postalCode: ['', Validators.pattern(/\d{2}-\d{3}/)],
    city: [''],

    contact: [''],

    troop: [''],
    rank: ['', Validators.required],
    instructorRank: [''],
  });


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
    private ranksService: RanksService
  ) {}

  ngOnInit(): void {
    forkJoin({
      roles: this.rolesService.getRoles(),
      troops: this.troopsService.getTroops(),
      ranks: this.ranksService.getRanks(),
      instructorRanks: this.ranksService.getInstructorRanks(),
    }).subscribe((x) => {
      // Load roles
      x.roles.forEach((role) => this.allRoles.push(role));
      if (x.roles.length > 0) {
        this.scoutRoles.push(x.roles[0]);
      }

      // Load troops
      x.troops.forEach((troop) => this.availableTroops.push(troop));

      // Load ranks
      x.ranks.forEach((rank) => this.availableRanks.push(rank));
      if (x.ranks.length > 0) {
        this.rank.setValue(x.ranks[0].name);
      }

      // Load instructor ranks
      x.instructorRanks.forEach((rank) =>
        this.availableInstructorRanls.push(rank)
      );

      this.pageLoaded = true;
    });
  }

  // TROOPS

  setTroop(troop: Troop): void {
    this.troop.setValue(troop.name);
  }

  clearTroop(): void {
    this.troop.setValue(undefined);
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

  addRank(role: Rank): void {
    this.rank.setValue(role.name);
  }

  // INSTRUCTOR RANK

  addInstructorRank(role: InstruktorRank): void {
    this.rank.setValue(role.name);
  }

  removeInstructorRank(): void {
    this.rank.setValue(undefined);
  }

  // FUNCTIONALITIES

  public async open(mode: PageModes): Promise<any> {
    this.modal.open(this.content);
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
}
