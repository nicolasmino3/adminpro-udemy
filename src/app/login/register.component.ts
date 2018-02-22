import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor() {}

  sonIguales(param1: string, param2: string) {
    return (form: FormGroup) => {
      const pass1 = form.controls[param1].value;
      const pass2 = form.controls[param2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };
  }
  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2')});

    this.forma.setValue({
      nombre: 'Nicolas',
      email: 'nicolasmino3@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {
    if ( this.forma.invalid ) {
      return;
    }
    if ( !this.forma.value.condiciones ) {
      console.log('Debe aceptar las condiciones');
    }
    console.log(this.forma.value);
  }
}
