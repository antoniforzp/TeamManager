import {Component, OnInit} from '@angular/core';
import {PagesUrls} from '../utils/PagesUrls';

@Component({
  template: ''
})
export abstract class AbstractComponent implements OnInit {

  public alert: string;
  public PagesUrlsLocal = PagesUrls;

  protected constructor() {
  }

  ngOnInit(): void {
  }
}
