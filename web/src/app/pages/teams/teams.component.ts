import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { hideWithTimeout, Result, ResultOld } from 'src/app/utils/Result';
import { TeamsService } from '../../services/teams.service';

interface TeamForm {
  teamId: number;
  formGroup: FormGroup;
  result$: Subject<Result>;
}

@Component({
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  teams$ = new Subject<Team[]>();
  addTeamForm = this.fb.group({
    name: ['', Validators.required],
    patron: ['', Validators.required],
  });

  editResult$ = new Subject<ResultOld>();
  addResult$ = new Subject<ResultOld>();

  editTeamsForms: TeamForm[] = [];

  constructor(private fb: FormBuilder, private teamsService: TeamsService) {
    // Load user teams and create custom array of control forms
    this.teams$.subscribe((x) => {
      this.editTeamsForms = [];
      x.forEach((t) => {
        this.editTeamsForms.push({
          teamId: t.teamId,
          result$: new Subject<Result>(),
          formGroup: this.fb.group({
            teamId: [t.teamId],
            teamName: [t.name, Validators.required],
            teamPatron: [t.patron, Validators.required],
          }),
        });
      });
    });
  }

  ngOnInit(): void {
    this.teamsService.getUserTeams().subscribe((x) => this.teams$.next(x));
  }

  refreshPage(): void {
    this.teamsService.getUserTeams().subscribe((x) => this.teams$.next(x));
  }

  addTeam(): void {
    this.teamsService.addTeam(this.name.value, this.patron.value).subscribe({
      next: (res) => {
        this.addResult$.next({ show: true, result: res });
        hideWithTimeout(this.addResult$);
        this.refreshPage();
      },
      error: () => {
        this.addResult$.next({ show: true, result: false });
        hideWithTimeout(this.addResult$);
      },
    });
  }

  editTeam(
    teamId: number,
    teamName: string,
    teamPatron: string,
    result: Subject<ResultOld>
  ): void {
    this.teamsService.patchTeam(teamId, teamName, teamPatron).subscribe({
      next: (res) => {
        result.next({ show: true, result: res });
        hideWithTimeout(result);
      },
      error: () => {
        result.next({ show: true, result: false });
        hideWithTimeout(result);
      },
    });
  }

  deleteTeam(teamId: number, result: Subject<ResultOld>): void {
    this.teamsService.deleteTeam(teamId).subscribe({
      next: (res) => {
        result.next({ show: true, result: res });
        hideWithTimeout(result);
        this.refreshPage();
      },
      error: () => {
        result.next({ show: true, result: false });
        hideWithTimeout(result);
      },
    });
  }

  get name(): any {
    return this.addTeamForm.get('name');
  }

  get patron(): any {
    return this.addTeamForm.get('patron');
  }

  teamGroup(index: number): FormGroup {
    return this.editTeamsForms[index].formGroup;
  }
}
