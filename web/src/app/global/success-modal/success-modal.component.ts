import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class SuccessModalComponent implements OnInit {
  modalReference: any;
  closeResult: string | undefined;
  textContent: string | undefined = undefined;
  @ViewChild('content')
  public content!: TemplateRef<any>;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {}

  public async open(textContent: string): Promise<any> {
    this.textContent = textContent;
    this.modalReference = this.modalService.open(this.content);
    this.modalReference.result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${reason}`;
      }
    );
  }

  public async close(): Promise<any> {
    this.modalReference.close();
  }
}
