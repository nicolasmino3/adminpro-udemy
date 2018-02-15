import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  label: string = '';

  constructor(public title: Title,
              private router: Router,
              private meta: Meta) {

    this.getDataRouter().subscribe(
      (data) => {
        this.label = data.titulo;
        this.title.setTitle(this.label);

        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.label
        };
        this.meta.updateTag(metaTag);
      }
    );
   }

  ngOnInit() {
  }

  getDataRouter() {
    return this.router.events
        .filter((evento) => evento instanceof ActivationEnd )
        .filter((evento: ActivationEnd) => evento.snapshot.firstChild === null)
        .map((evento: ActivationEnd) => evento.snapshot.data);
  }

}
