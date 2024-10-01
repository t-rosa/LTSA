import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement, DepartementService } from './departement.service';

@Component({
  standalone: true,
  template: `
    <ul>
      @for (departement of this.departements$ | async; track departement.code) {
      <li>{{ departement.nom }} - {{ departement.code }}</li>
      }
    </ul>
  `,
  imports: [CommonModule],
})
export default class DepartementListComponent {
  readonly service = inject(DepartementService);

  @Input()
  set code(regionCode: string) {
    this.departements$ = this.service.loadDepartementsByRegion(regionCode);
  }

  departements$!: Observable<Departement[]>;
}
