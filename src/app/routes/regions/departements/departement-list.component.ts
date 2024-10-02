import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { DepartementService } from './departement.service';

@Component({
  standalone: true,
  template: `
    <ul>
      @switch (this.status()) { @case ("loading") {
      <li>Chargement en cours...</li>
      } @case ("error") {
      <li>Il y a eu une erreur: {{ this.error() }}</li>
      } @default { @for (departement of this.departements(); track
      departement.code) {
      <li>{{ departement.nom }} - {{ departement.code }}</li>
      } } }
    </ul>
  `,
  imports: [CommonModule],
})
export default class DepartementListComponent {
  private readonly service = inject(DepartementService);
  private readonly route = inject(ActivatedRoute);

  private readonly code$ = this.route.paramMap.pipe(
    map((params) => params.get('code'))
  );

  private readonly query = toSignal(
    this.code$.pipe(
      filter((code) => code !== null),
      switchMap((code) => this.service.loadDepartementsByRegionCodeQuery(code))
    ),
    { initialValue: { data: [], status: 'loading', error: undefined } }
  );

  departements = computed(() => this.query().data);
  status = computed(() => this.query().status);
  error = computed(() => this.query().error);
}
