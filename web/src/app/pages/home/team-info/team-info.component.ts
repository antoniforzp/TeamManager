import { EventEmitter } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
} from 'ng-apexcharts';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Journey } from 'src/app/model/data/Journey';
import { Meeting } from 'src/app/model/data/Meeting';
import { Patrol } from 'src/app/model/data/Patrol';
import { Rank } from 'src/app/model/data/Rank';
import { Scout } from 'src/app/model/data/Scout';
import { AppNavigationService } from 'src/app/services/core/app-navigation.service';
import { AppStateService } from 'src/app/services/core/app-state.service';
import { JourneysService } from 'src/app/services/data/journeys.service';
import { MeetingsService } from 'src/app/services/data/meetings.service';
import { PatrolsService } from 'src/app/services/data/patrols.service';
import { RanksService } from 'src/app/services/data/ranks.service';
import { ScoutsService } from 'src/app/services/data/scouts.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

interface TeamData {
  scouts?: Scout[];
  patrols?: Patrol[];
  journeys?: Journey[];
  meetings?: Meeting[];
  ranks?: Rank[];
}

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamInfoComponent implements OnInit {
  destroy$ = new Subject();
  pageLoaded = false;

  scoutNo: number;
  patrolsNo: number;
  journeysNo: number;
  meetingsNo: number;

  @ViewChild('chart') chart: ChartComponent;
  chartLoaded = false;
  chartError = false;
  public chartOptions: Partial<ChartOptions>;

  ranks: Rank[] = [];
  scouts: Scout[] = [];

  @Output() infoLoaded = new EventEmitter();

  constructor(
    private scoutsService: ScoutsService,
    private patrolsService: PatrolsService,
    private journeysService: JourneysService,
    private meetingsService: MeetingsService,
    private ranksService: RanksService,
    private appState: AppStateService,
    private changeDetector: ChangeDetectorRef,
    private navigatorService: AppNavigationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    const teamInfo$ =
      this.appState.teamId !== undefined
        ? this.fetchInfoTeam()
        : of({} as TeamData);

    teamInfo$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (x) => {
        this.scoutNo = x.scouts?.length;
        this.patrolsNo = x.patrols?.length;
        this.journeysNo = x.journeys?.length;
        this.meetingsNo = x.meetings?.length;

        this.ranks = x.ranks;
        this.scouts = x.scouts;

        this.setChartData();

        this.infoLoaded.emit();

        this.pageLoaded = true;
        this.changeDetector.detectChanges();
      },
    });
  }

  private fetchInfoTeam(): Observable<TeamData> {
    return forkJoin({
      scouts: this.scoutsService.getScouts(),
      patrols: this.patrolsService.getPatrols(),
      journeys: this.journeysService.getJourneys(),
      meetings: this.meetingsService.getMeetings(),
      ranks: this.ranksService.getRanks(),
    });
  }

  // CHART SETUP

  setChartData(): void {
    if (this.checkRanksValues(this.getRanksValues())) {
      this.chartError = true;
    } else {
      this.chartOptions = {
        series: this.getRanksValues(),
        chart: {
          type: 'pie',
          height: '240px',
          redrawOnParentResize: true,
        },
        responsive: [
          {
            breakpoint: 1000,
            options: {
              legend: {
                show: false,
              },
            },
          },
        ],
        labels: this.getRanksNames(),
      };
    }
    this.chartLoaded = true;
    this.changeDetector.detectChanges();
  }

  private getRanksNames(): string[] {
    return this.ranks.map((x) => this.translate.instant(x.name));
  }

  private getRanksValues(): number[] {
    const scoutRanks: number[] = [];
    if (this.ranks) {
      this.ranks.forEach((x) => {
        scoutRanks.push(
          this.scouts.filter((s) => s.rank.rankId === x.rankId).length
        );
      });
    }

    return scoutRanks;
  }

  private checkRanksValues(ranks: number[]): boolean {
    return ranks.filter((x) => x !== 0).length <= 0;
  }

  // NAVIGATION

  goScouts(): void {
    this.navigatorService.navigateToScouts();
  }

  goPatrols(): void {
    this.navigatorService.navigateToTroops();
  }

  goJourneys(): void {
    this.navigatorService.navigateToMeetingsJourneys();
  }

  goMeetings(): void {
    this.navigatorService.navigateToMeetingsJourneys();
  }
}
