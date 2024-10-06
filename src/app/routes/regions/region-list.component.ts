import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegionService } from './region.service';
import { NavBarComponent } from '@/app/components/nav-bar/nav-bar.component';

@Component({
  standalone: true,
  template: `
    <main class="main">
      <al-nav-bar />
      <section>
        <h2>Région</h2>
        @switch (this.status()) { @case ("loading") {
        <p>Chargement des régions...</p>
        } @case ("error") {
        <p>
          Il y a eu une erreur lors du chargement des régions :
          {{ this.error() }}
        </p>
        } @default {
        <ul>
          @for (region of this.regions() ; track region.code) {
          <li>
            <a [routerLink]="region.code"
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
    </main>
  `,
  styleUrl: './region-list.component.css',
  imports: [RouterOutlet, RouterLink, CommonModule, NavBarComponent],
})
export default class RegionsComponent {
  private readonly service = inject(RegionService);

  private readonly query = toSignal(this.service.loadRegionsQuery(), {
    initialValue: { data: [], status: 'loading', error: undefined },
  });

  regions = computed(() => this.query().data);
  status = computed(() => this.query().status);
  error = computed(() => this.query().error);
}
