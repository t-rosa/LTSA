import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Departement } from './departement.service';

@Component({
  selector: 'al-departement-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      @for (departement of this.departements(); track departement.code) {
      <li>{{ departement.nom }} - {{ departement.code }}</li>
      }
    </ul>
  `,
})
export class DepartementListComponent {
  departements = input<Departement[] | null>([]);
}
