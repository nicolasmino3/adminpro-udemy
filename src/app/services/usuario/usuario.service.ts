import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import 'rxjs/operator/map';


@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(public http: HttpClient, public router: Router) {
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
  login( usuario: Usuario, recordar: boolean = false) {
    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
          .map(
            (resp: any) => {
              localStorage.setItem('id', resp.id);
              localStorage.setItem('token', resp.token);
              localStorage.setItem('usuario', JSON.stringify(resp.usuario));
              this.usuario = usuario;
              this.token = resp.token;
              return true;
            }
          );

  }
  estaLogueado() {
    return (this.token.length > 0) ? true : false;
  }
  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).map(
      (res: any) => {
        swal('Usuario creado correctamente', usuario.email, 'success');
        return res.usuario;
      }
    );
  }

}
