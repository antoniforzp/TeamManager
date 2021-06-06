import { HttpErrorResponse } from '@angular/common/http';
import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnChanges {
  @Input() error: HttpErrorResponse | Error;

  errorName: string;
  errorMessage: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.errorName = this.error.name;
    this.errorMessage = this.error.message;
  }
}
