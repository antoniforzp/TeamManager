import { HttpErrorResponse } from '@angular/common/http';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  @Input() error: HttpErrorResponse;

  constructor() {}

  ngOnInit(): void {}
}
