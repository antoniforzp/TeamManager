import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  // Block options when no teams available
  $unlock = new Subject<boolean>();

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService
      .getCurrentUserTeamsNo()
      .subscribe((x) => this.$unlock.next(x > 0));
  }
}
