import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { Result } from 'src/app/utils/Result';
import { AddTeamService } from './add-team.service';

@Component({
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css'],
})
export class AddTeamComponent implements OnInit {
  teams$ = new Subject<Team[]>();
  result$ = new Subject<Result>();
  addTeamForm = this.fb.group({
    name: ['', Validators.required],
    patron: ['', Validators.required],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private addTeamService: AddTeamService
  ) {}

  ngOnInit(): void {
    this.refreshPage();
  }

  refreshPage(): void {
    this.addTeamService.getUserTeams().subscribe((x) => this.teams$.next(x));
  }

  addTeam(): void {
    this.addTeamService
      .addTeam({
        teamId: -1,
        name: this.name.value,
        patron: this.patron.value,
      })
      .subscribe((x) => this.result$.next(x));
  }

  get name(): any {
    return this.addTeamForm.get('name');
  }

  get patron(): any {
    return this.addTeamForm.get('patron');
  }
}
