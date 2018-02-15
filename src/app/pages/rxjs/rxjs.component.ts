// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  private suscription: Subscription;
  constructor() {

    this.suscription = this.regresaObservable()
     .subscribe(
      contador => console.log('Contador', contador ),
      error => console.error('Error en el obs', error),
      () => console.log('El observable Termino!')
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable(
      observer => {
        let contador = 0;
        const intervalo = setInterval(
          () => {
            contador += 1;
            const salida = {
              valor: contador
            };
            observer.next(salida);


           /*  if ( contador === 3 ) {
              clearInterval(intervalo);
              observer.complete();
            } */
           /*  if ( contador === 2 ) {
              // clearInterval(intervalo);
              observer.error('Auxilio!');
            } */
          }, 500
        );
      }
    )
    .map(
      (resp: any) => {
        return resp.valor;
      }
    ).filter( valor => {
      if ( (valor % 2) === 1) {
        return true;
      } else {
        return false;
      }
    })
    .retry(2);
  }

}
