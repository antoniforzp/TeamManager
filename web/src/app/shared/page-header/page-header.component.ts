import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() header: string;
  @Input() goBackUrl: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  back(): void {
    this.router.navigateByUrl(this.goBackUrl);
  }
}
