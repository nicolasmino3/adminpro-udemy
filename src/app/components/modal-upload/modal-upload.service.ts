import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalUploadService {
  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal service listo');
   }

   mostrarModal(tipo: string, id: string) {
     this.tipo = tipo;
     this.id = id;
     this.oculto = '';
   }

   ocultarModal( ) {
    this.tipo = null;
    this.id = null;
    this.oculto = 'oculto';
   }

}
