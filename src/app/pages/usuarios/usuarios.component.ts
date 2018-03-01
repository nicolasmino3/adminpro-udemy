import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  totalRegistros: number = 0;
  desde: number = 0;
  cargando: boolean = true;
  constructor( public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe(
          (resp: any) => {
            this.totalRegistros = resp.total;
            this.usuarios = resp.usuarios;
            this.cargando = false;
          }
        );
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    if ( desde < 0) {
      return;
    }
    if ( desde >= this.totalRegistros) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuarios( termino: string) {
    if ( termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuario( termino )
        .subscribe(
          (usuarios: Usuario[]) => {
            this.usuarios = usuarios;
            this.cargando = false;
          }
        );
  }
  borrarUsuario( usuario: Usuario) {
      if ( usuario._id === this._usuarioService.usuario._id ) {
        swal('Error!', 'No se puede borrar así mismo', 'error');
        return true;
      }
      swal({
        title: '¿Está seguro?',
        text: 'Esta a punto de borrar al usuario ' + usuario.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
      .then((borrar) => {
        if (borrar) {
          this._usuarioService.borrarUsuario( usuario._id )
              .subscribe( borrado => {
                  this.cargarUsuarios();
              });
        }
      });
      return console.log(usuario);
  }
  actualizarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario )
        .subscribe();
  }

}
