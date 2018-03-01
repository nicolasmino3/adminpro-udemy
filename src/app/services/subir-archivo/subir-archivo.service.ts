import { URL_SERVICIOS } from '../../config/config';
import { Injectable } from '@angular/core';

@Injectable()
export class SubirArchivoService {
  constructor() {}

  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise((resolve, reject) => {

      const formData = new FormData();

      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);
      // actua como un observable para saber el estado
      xhr.onreadystatechange = function() {
        // me interesa cuando termina el proceso. se podría hacer un loading dependiendo de lo que se reciba.
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('imagen subida');
            resolve( JSON.parse(xhr.response) );
          } else {
            reject( xhr.response );
          }
        }
      };
      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
