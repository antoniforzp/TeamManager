import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  secretKey = 'SECRET_KEY';

  constructor() {}

  encrypt(value: string): string {
    const encrypted = CryptoJS.HmacSHA256(value, this.secretKey).toString();
    return encrypted;
  }
}
