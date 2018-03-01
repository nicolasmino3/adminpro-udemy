import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService, LoginGuard, SubirArchivoService } from '../services/services.index';
import { UsuarioService } from './usuario/usuario.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
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
    LoginGuard,
    SubirArchivoService,
    ModalUploadService
  ],
  declarations: []
})
export class ServicesModule { }
