import { UsuarioService } from '../../services/services.index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor( public _usuarioService: UsuarioService) { }

  ngOnInit() {
  }

}
