import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import 'rxjs/operator/map';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(public http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService) {
    this.cargarLocalStorage();
  }
  cargarLocalStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  logOut() {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
  guardarLocalStorage(id, token, usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
        .map((resp: any) => {
            this.guardarLocalStorage(resp.usuario._id, resp.token, resp.usuario);
            return true;
        });
  }
  estaLogueado() {
    return this.token.length > 0 ? true : false;
  }
  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).map((res: any) => {
      swal('Usuario creado correctamente', usuario.email, 'success');
      return res.usuario;
    });
  }

  actualizarUsuario(usuario: Usuario) {
    const url =
      URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put(url, usuario).map((resp: any) => {
      // Caso que este modificando el rol de la persona logueada.
      if ( usuario._id === this.usuario._id ) {
        const usuarioDB: Usuario = resp.usuario;
        this.guardarLocalStorage( usuarioDB._id, this.token, usuarioDB );
      }

      swal('Usuario actualizado', usuario.nombre, 'success');
      return true;
    });
  }

  cambiarImagen( archivo: File, id: string) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then(
          (resp: any) => {
            this.usuario.img = resp.usuario.img;
            swal('Imagen Actualizada', this.usuario.nombre, 'success');
            this.guardarLocalStorage(id, this.token, this.usuario);
          }
        ).catch(resp => console.log(resp));
  }
  cargarUsuarios( desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuario( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get( url )
              .map(
                (resp: any) => resp.usuarios
              );

  }
  borrarUsuario( id ) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete( url )
          .map(
            resp => {
              swal('Usuario Borrado', 'El usuario ha sido borrado correctamente' , 'success');
              return true;
            }
          );
  }
}
