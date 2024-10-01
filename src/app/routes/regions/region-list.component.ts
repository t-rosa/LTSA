import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { RegionService } from './region.service';

@Component({
  standalone: true,
  template: `
    <div class="grid grid-cols-2">
      <section>
        <h2 class="text-3xl font-semibold">Région</h2>
        @switch (this.status$ | async) { @case ("loading") {
        <p>Chargement des régions...</p>
        } @case ("error") {
        <p>
          Il y a eu une erreur lors du chargement des régions :
          {{ this.error$ | async }}
        </p>
        } @default {
        <ul>
          @for (region of this.regions$ | async; track region.code) {
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
      </section>
      <section>
        <h2 class="text-3xl font-semibold">Départements</h2>
        <router-outlet />
      </section>
    </div>
  `,
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export default class RegionsComponent {
  readonly service = inject(RegionService);

  regions$;
  status$;
  error$;

  constructor() {
    const state$ = this.service.loadRegionsState();

    this.regions$ = state$.pipe(map((state) => state.regions));
    this.status$ = state$.pipe(map((state) => state.status));
    this.error$ = state$.pipe(map((state) => state.error));
  }
}
