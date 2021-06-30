import { HttpErrorResponse } from '@angular/common/http';
import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';

enum ErrorTypes {
  GENERIC,
  SERVER_ERROR,
  LOST_CONNECTION,
}

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnChanges {
  @Input() error: HttpErrorResponse | Error;

  ErrorTypes = ErrorTypes;
  errorType: ErrorTypes;

  errorName: string;
  errorMessage: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.errorName = this.error.name;
    this.errorMessage = this.error.message;

    if (this.error instanceof HttpErrorResponse) {
      if (this.error.status === 0) {
        this.errorType = ErrorTypes.LOST_CONNECTION;
      } else if (this.error.status === 500) {
        this.errorType = ErrorTypes.SERVER_ERROR;
      } else {
        this.errorType = ErrorTypes.GENERIC;
      }
    }
  }
}
