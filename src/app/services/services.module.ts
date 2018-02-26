import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService, LoginGuard } from '../services/services.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuard
  ],
  declarations: []
})
export class ServicesModule { }
