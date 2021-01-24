import { Injectable, TemplateRef } from '@angular/core';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  modalReference!: NgbModalRef;
  options = {
    size: 'lg',
    scrollable: true,
  } as NgbModalOptions;

  constructor(private ngbService: NgbModal, private config: NgbModalConfig) {
    this.setupBehaviour('static', false);
  }

  public async open(
    modalContent: TemplateRef<any>,
    options?: NgbModalOptions
  ): Promise<any> {
    if (options) {
      this.modalReference = this.ngbService.open(modalContent, options);
    } else {
      this.modalReference = this.ngbService.open(modalContent, this.options);
    }
  }

  public async close(): Promise<any> {
    this.modalReference.close();
  }

  public setupBehaviour(backdrop: boolean | 'static', keyboard: boolean): void {
    this.config.backdrop = backdrop;
    this.config.keyboard = keyboard;
  }

  public setupOptions(options: NgbModalOptions): void {
    this.options = options;
  }
}
