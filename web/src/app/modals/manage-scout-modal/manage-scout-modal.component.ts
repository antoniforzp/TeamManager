import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { PageModes } from 'src/app/utils/PageModes';
import { ModalsService } from '../modals.service';

@Component({
  selector: 'app-manage-scouts-modal',
  templateUrl: './manage-scout-modal.component.html',
  styleUrls: ['./manage-scout-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ManageScoutModalComponent implements OnInit {
  mode$ = new Subject<PageModes>();

  @ViewChild('content')
  public content!: TemplateRef<any>;

  constructor(private modal: ModalsService) {}

  ngOnInit(): void {}

  public async open(mode: PageModes): Promise<any> {
    this.modal.open(this.content);
  }

  public async close(): Promise<any> {
    this.modal.close();
  }
}
