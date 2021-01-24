import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { map, toArray } from 'rxjs/operators';
import { Role } from 'src/app/model/Role';
import { Scout } from 'src/app/model/Scout';
import { ScoutsService } from '../../services/scouts.service';

interface ScoutRow {
  scoutInfo: Scout;
  scoutRoles: Role[];
  isSelected: boolean;
  moreVisible: boolean;
}

@Component({
  templateUrl: './scouts.component.html',
  styleUrls: ['./scouts.component.css'],
})
export class ScoutsComponent implements OnInit {
  scoutsRows = [] as ScoutRow[];
  pageLoaded = false;

  allSelected = false;
  anySelected = false;

  constructor(private scoutsService: ScoutsService) {}

  ngOnInit(): void {
    forkJoin({
      scouts: this.scoutsService.getScouts(),
      roles: this.scoutsService.getAllRoles(),
    })
      .pipe(
        map((x) => {
          const rows = [] as ScoutRow[];
          x.scouts.forEach((scout) =>
            rows.push({
              scoutInfo: scout,
              scoutRoles: x.roles.filter(
                (role) => role.scoutId === scout.scoutId
              ),
              isSelected: false,
              moreVisible: false,
            })
          );
          return rows;
        })
      )
      .subscribe((result) => {
        this.scoutsRows = result;
        this.pageLoaded = true;
      });
  }

  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;
    this.scoutsRows.forEach((x) => (x.isSelected = this.allSelected));
  }

  toggleSelect(row: ScoutRow): void {
    row.isSelected = !row.isSelected;
    // In case that user manually select all records in table
    this.allSelected =
      this.scoutsRows.filter((x) => !x.isSelected).length === 0;
  }

  toggleMore(row: ScoutRow): void {
    row.moreVisible = !row.moreVisible;
  }
}