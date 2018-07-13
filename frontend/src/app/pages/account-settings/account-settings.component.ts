import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public _settingsService: SettingsService 
  ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any) {

    this.aplicarCheck(link);
    this._settingsService.aplicarTema(tema);

  }

  aplicarCheck(link: any) {

    let selectores: any = document.getElementsByClassName('selector');

    for (const selector of selectores) {
      selector.classList.remove('working'); 
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._settingsService.ajustes.tema;
    
    for (const ref of selectores) {
      if(ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
