import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegionService } from './region.service';

@Component({
  selector: 'al-region-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    @switch (this.service.query().status) { @case ("pending") {
    <p>En attente</p>
    } @case ("loading") {
    <p>Chargement des régions...</p>
    } @case ("error") {
    <p>
      Il y a eu une erreur lors du chargement des régions :
      {{ this.service.query().error?.message }}
    </p>
    } @default {
    <ul>
      @for (region of this.service.regions(); track region.code) {
      <li>
        <a [routerLink]="region.code" class="cursor-pointer hover:underline"
          >{{ region.nom }} - {{ region.code }}
        </a>
      </li>
      } @empty {
      <li>Aucun résultats</li>
      }
    </ul>
    } }
  `,
})
export class RegionListComponent {
  readonly service = inject(RegionService);
}
