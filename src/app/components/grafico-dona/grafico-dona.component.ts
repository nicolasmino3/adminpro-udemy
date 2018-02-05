import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {

  constructor() { }
  @Input() data = [];
  @Input() labels = [];
  @Input() charType = '';
  @Input() leyenda = '';
  ngOnInit() {
  }

}
