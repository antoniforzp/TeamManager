import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  constructor() {}

  editUserData(name: string, surname: string): void {
    console.log({
      newName: name,
      newSurname: surname,
    });
  }

  editUserPassword(password: string): void {
    console.log({
      newPassword: password,
    });
  }
}
