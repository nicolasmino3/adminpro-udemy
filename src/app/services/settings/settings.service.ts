import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {
  public ajustes: Ajustes = {
    url: 'assets/css/colors/default-dark.css',
    tema: 'defualt'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }
  }
  aplicarTema(tema) {
    const url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);
    this.ajustes.url = url;
    this.ajustes.tema = tema;

    this.guardarAjustes();
  }
}


interface Ajustes {
  url: string;
  tema: string;
}
