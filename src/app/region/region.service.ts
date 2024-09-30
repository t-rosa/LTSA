import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap } from 'rxjs';

export interface Department {
  name: string;
  code: string;
}

export interface DepartmentDTO {
  nom: string;
  code: string;
}

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
  readonly #URL = 'https://geo.api.gouv.fr/regions';
  readonly #http = inject(HttpClient);

  readonly #selectedRegion = signal<Region | null>(null);
  selectRegion(selectedRegion: Region) {
    this.#selectedRegion.set(selectedRegion);
  }

  private readonly departments$ = toObservable(this.#selectedRegion).pipe(
    switchMap((region) => this.#loadDepartmentsByRegion(region)),
    catchError((err) => {
      console.error('Il y a eu une érreur...', err);
      return of([]);
    }),
    map(this.#mapToDepartment)
  );

  #loadDepartmentsByRegion(region: Region | null) {
    if (!region) return of([]);

    return this.#http.get<DepartmentDTO[]>(
      this.#URL + '/' + region.code + '/departements?fields=nom,code'
    );
  }

  #mapToDepartment(departments: DepartmentDTO[]): Department[] {
    return departments.map((depratment) => ({
      name: depratment.nom,
      code: depratment.code,
    }));
  }

  readonly departements = toSignal(this.departments$, { initialValue: [] });

  private readonly regions$ = this.#http
    .get<RegionDTO[]>(this.#URL + '?fields=nom,code')
    .pipe(
      map(this.#mapToRegion),
      catchError((err) => {
        console.error('Il y a eu une érreur...', err);
        return of([]);
      })
    );

  readonly regions = toSignal(this.regions$, { initialValue: [] });

  #mapToRegion(regions: RegionDTO[]): Region[] {
    return regions.map((region) => ({
      name: region.nom,
      code: region.code,
    }));
  }
}
