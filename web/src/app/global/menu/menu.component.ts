import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  lockedOptions = false;

  constructor(
    private menuService: MenuService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.menuService.getCurrentUserTeamsNo().subscribe((x) => {
      this.lockedOptions = x <= 0;
      this.changeDetector.detectChanges();
    });
  }
}
