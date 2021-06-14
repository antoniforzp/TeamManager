import { Injectable } from '@angular/core';
import * as bcrypt from 'bcrypt';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  constructor() {}

  encrypt(value: string): string {
    const salt = bcrypt.genSaltSync(10);
    const encoded = bcrypt.hashSync(value, salt);

    console.log(value, encoded);

    return encoded;
  }
}
