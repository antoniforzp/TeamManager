import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ProgressModalComponent implements OnInit {
  closeResult: string | undefined;
  modalReference: any;
  @ViewChild('content')
  public content!: TemplateRef<any>;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {}

  public async open(): Promise<any> {
    this.modalReference = this.modalService.open(this.content);
    this.modalReference.result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed with: ${reason}`;
      }
    );
  }

  public async close(): Promise<any> {
    this.modalReference.close();
  }
}
