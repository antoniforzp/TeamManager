import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Role } from 'src/app/model/data/Role';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}

  public sort(initialData: any[], sort: Sort): any[] {
    const copy = initialData.slice();

    if (!sort.active || sort.direction === '') {
      return copy;
    }

    const output = copy.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);

      if (aKeys.includes(sort.active) && bKeys.includes(sort.active)) {
        return this.manageComparison(a[sort.active], b[sort.active], isAsc);
      }

      return 0;
    });

    return output;
  }

  private manageComparison(a: any, b: any, isAsc: boolean): number {
    if (typeof a === 'string' && typeof b === 'string') {
      return this.compareStrings(a, b, isAsc);
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return this.compareNumbers(a, b, isAsc);
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      if (this.checkIfRoles(a, b)) {
        return this.compareRoles(a as Role[], b as Role[], isAsc);
      }
    }

    if (typeof a === 'object' && typeof b === 'object') {
      if (a instanceof Date && b instanceof Date) {
        return this.compareDates(a as Date, b as Date, isAsc);
      }
    }

    return this.compareCommon(a, b, isAsc);
  }

  // GENERAL SCENARIOS

  private compareStrings(a: string, b: string, isAsc: boolean): number {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a === b) {
      return 0;
    }
    return a.localeCompare(b) * (isAsc ? 1 : -1);
  }

  private compareNumbers(a: number, b: number, isAsc: boolean): number {
    if (a === b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private compareDates(a: Date, b: Date, isAsc: boolean): number {
    if (a === b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? -1 : 1); /// Reversed sorting
  }

  private compareCommon(a: any, b: any, isAsc: boolean): number {
    if (a === b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  // SPECIAL SCENARIOS

  private checkIfRoles(a: any[], b: any[]): boolean {
    let isRoles = true;

    a.forEach((x) => {
      if (!('roleId' in x)) {
        isRoles = false;
      }
    });

    b.forEach((x) => {
      if (!('roleId' in x)) {
        isRoles = false;
      }
    });

    return isRoles;
  }

  private compareRoles(a: Role[], b: Role[], isAsc: boolean): number {
    const aHighestRoleId = Math.max.apply(
      Math,
      a.map((x) => x.roleId)
    );
    const bHighestRoleId = Math.max.apply(
      Math,
      b.map((x) => x.roleId)
    );

    return (aHighestRoleId < bHighestRoleId ? -1 : 1) * (isAsc ? -1 : 1);
  }
}
