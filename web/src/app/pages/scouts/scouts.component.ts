import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Role } from 'src/app/model/Role';
import { Scout } from 'src/app/model/Scout';
import { ScoutsService } from '../../services/scouts.service';

interface ScoutRow {
  scoutInfo: Scout;
  scoutRoles: Role[];
  isSelected: boolean;
}

@Component({
  templateUrl: './scouts.component.html',
  styleUrls: ['./scouts.component.css'],
})
export class ScoutsComponent implements OnInit {
  scoutsRows = [] as ScoutRow[];
  pageLoaded = true;

  allSelected = false;
  anySelected = false;

  constructor(private scoutsService: ScoutsService) {}

  ngOnInit(): void {
    this.scoutsService.getScouts().subscribe((x) => {
      x.forEach((scout) => {
        this.scoutsService.getRoles(scout.scoutId).subscribe((roles) =>
          // Creating scouts row data
          this.scoutsRows.push({
            scoutInfo: scout,
            scoutRoles: roles,
            isSelected: false,
          })
        );
      });
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

  test(): void {
    console.log(this.scoutsRows.filter((x) => x.isSelected));
  }
}
