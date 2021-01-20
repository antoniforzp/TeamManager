import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Scout } from 'src/app/model/Scout';
import { ScoutsService } from '../../services/scouts.service';

@Component({
  templateUrl: './scouts.component.html',
  styleUrls: ['./scouts.component.css'],
})
export class ScoutsComponent implements OnInit {
  scoutsData$ = new Subject<Scout[]>();

  constructor(private scoutsService: ScoutsService) {}

  ngOnInit(): void {
    this.scoutsService.getScouts().subscribe((x) => this.scoutsData$.next(x));
  }
}
