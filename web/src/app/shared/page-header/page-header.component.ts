import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/core/navigation.service';
import { AppRoutes } from '../menu/Routes';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() header: string;
  @Input() goBackRoute: AppRoutes;

  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {}

  back(): void {
    this.navigationService.navigateTo(this.goBackRoute);
  }
}
