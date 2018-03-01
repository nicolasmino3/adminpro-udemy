import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalUploadService {
  public tipo: string;
  public id: string;

  public oculto: string = '';

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal service listo');
   }

   mostrarModal() {
     
   }

   ocultarModal() {
     
   }

}
