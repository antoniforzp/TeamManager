import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ScoutsService} from '../../../services/scouts.service';

@Component({
  selector: 'app-scouts-records-page',
  templateUrl: './scouts-records-page.component.html',
  styleUrls: ['./scouts-records-page.component.css']
})
export class ScoutsRecordsPageComponent implements OnInit, AfterViewInit {

  constructor(private scoutsService: ScoutsService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.scoutsService.getListScouts();
  }

}
