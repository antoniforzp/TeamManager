import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/model/team';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css'],
})
export class TeamInfoComponent implements OnInit {
  @Input() name: string;
  @Input() patron: string;
  @Input() userTeams: Team[];

  constructor() {}

  ngOnInit(): void {}
}
