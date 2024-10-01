import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { DepartementListComponent } from './departement-list.component';
import { Departement, DepartementService } from './departement.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  template: `<al-departement-list
    [departements]="this.departements$ | async"
  />`,
  imports: [DepartementListComponent, CommonModule],
})
export default class DepartmentsComponent {
  readonly service = inject(DepartementService);

  @Input()
  set code(code: string) {
    this.departements$ = this.service.loadDepartementsByRegion(code);
  }

  departements$!: Observable<Departement[]>;
}
