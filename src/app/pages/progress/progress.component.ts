import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  progreso1: number = 0;
  progreso2: number = 0;

  constructor() { }

  actualizarProgress1($event) {
    this.progreso1 = $event;
  }
  actualizarProgress2($event) {
    this.progreso2 = $event;
  }
  ngOnInit() {
  }
}
