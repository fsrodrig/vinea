import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor( public _settingsService: SettingsService ) { }

  ngOnInit() {
    init_plugins();
  }

}
