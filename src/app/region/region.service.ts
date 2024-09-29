import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export interface Region {
  name: string;
  code: string;
}

export interface RegionDTO {
  nom: string;
  code: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  readonly #URL = 'https://geo.api.gouv.fr/regions?fields=nom,code';
  readonly #http = inject(HttpClient);

  readonly regions = signal<Region[]>([]);
  readonly error = signal<string | null>(null);

  loadRegions() {
    this.#http
      .get<RegionDTO[]>(this.#URL)
      .pipe(
        map((data) => this.#mapToRegion(data)),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (regions) => this.regions.set(regions),
        error: (error) => this.error.set(error.message),
      });
  }

  #mapToRegion(data: RegionDTO[]): Region[] {
    const regions: Region[] = [];

    for (const region of data) {
      regions.push({
        name: region.nom,
        code: region.code,
      });
    }

    return regions;
  }
}
