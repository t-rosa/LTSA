import { Component } from '@angular/core';
import { RegionListComponent } from './region-list.component';
import { DepartementListComponent } from './departements/departement-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  template: `
    <div class="grid grid-cols-2">
      <section>
        <h2 class="text-3xl font-semibold">Région</h2>
        <al-region-list />
      </section>
      <section>
        <h2 class="text-3xl font-semibold">Départements</h2>
        <router-outlet />
      </section>
    </div>
  `,
  imports: [RegionListComponent, DepartementListComponent, RouterOutlet],
})
export default class RegionsComponent {}
