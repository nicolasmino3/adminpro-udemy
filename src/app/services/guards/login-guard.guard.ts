import { UsuarioService } from '../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor( public _us: UsuarioService,
              public router: Router ) {}
  canActivate() {
    if ( this._us.estaLogueado()) {
      console.log('Paso por el login Guard');
      return true;
    } else {
      console.log('Bloqueado por el guards');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
