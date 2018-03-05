import { SubirArchivoService } from '../../services/services.index';
import { ModalUploadService } from './modal-upload.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File = null;
  imagenTemp: string = '';
  constructor( public _imagenService: SubirArchivoService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }
  subirImagen() {
    
    this._imagenService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
          .then((resp) => {
            console.log(resp);
            this._modalUploadService.notificacion.emit(resp);
            this.cerrarModal();
          })
          .catch(err => console.log('error en la carga'));
  }
  seleccionImage(archivo: File) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Solo imágenes', 'solo se pueden subir imágenes', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlTempfile = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;

  }
  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
  }

}
