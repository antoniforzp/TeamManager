import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements OnInit {
  @Input() initQuantity: number;
  @Input() foundQuantity: number;

  @Output() filterDone = new EventEmitter<string>();

  searchPhrase: string;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.changeDetector.detectChanges();
  }

  filter(newSearchPhrase: string): void {
    this.filterDone.emit(newSearchPhrase);
    this.changeDetector.detectChanges();
  }
}
