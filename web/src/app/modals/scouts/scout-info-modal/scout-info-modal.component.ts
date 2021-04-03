import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/model/Role';
import { Scout } from 'src/app/model/Scout';
import { Results } from 'src/app/utils/Result';

export interface ScoutInfoModalComponentEntry {
  scout: Scout;
  scoutRoles: Role[];
}

interface ScoutInfo {
  name: string;
  surname: string;
  birthDate: Date;
  pesel: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;

  troop: string;
  roles: { name: string; label: string }[];

  rankName: string;
  instructorRankName: string;
  instructorRankLabel: string;
}

@Component({
  templateUrl: './scout-info-modal.component.html',
  styleUrls: ['./scout-info-modal.component.scss'],
})
export class ScoutInfoModalComponent implements OnInit {
  scoutInfo: ScoutInfo;

  constructor(
    private dialogRef: MatDialogRef<ScoutInfoModalComponent>,

    @Inject(MAT_DIALOG_DATA) data: ScoutInfoModalComponentEntry
  ) {
    const scout = data.scout;
    this.scoutInfo = {
      name: scout.name,
      surname: scout.surname,
      birthDate: scout.birthDate,
      pesel: scout.pesel,
      address: scout.address,
      postalCode: scout.postalCode,
      city: scout.city,
      phone: scout.phone,
      troop: scout.troop.name,
      roles: data.scoutRoles.map((x) => {
        return {
          label: `role-${x.roleId}`,
          name: x.name,
        } as { name: string; label: string };
      }),
      rankName: scout.rank.name,
      instructorRankName: scout.instructorRank.name,
      instructorRankLabel: `instructor-rank-${scout.instructorRank.rankId}`,
    };
  }

  ngOnInit(): void {}

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }
}
