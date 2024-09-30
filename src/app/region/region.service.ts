import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, filter, map, of, Subject, switchMap } from 'rxjs';

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

  private readonly regionSelected$ = new Subject<Region>();

  handleSelectRegion(region: Region) {
    this.regionSelected$.next(region);
  }

  private readonly departments$ = this.regionSelected$.pipe(
    filter((region) => region !== null),
    switchMap((region) =>
      this.loadDepartmentsByRegion(region).pipe(catchError(this.handleError))
    ),
    map(this.mapToDepartment)
  );

  private loadDepartmentsByRegion(region: Region) {
    return this.#http.get<DepartmentDTO[]>(
      this.#URL + '/' + region.code + '/departements?fields=nom,code'
    );
  }

  readonly departements = toSignal(this.departments$, { initialValue: [] });

  private handleError(error: unknown) {
    console.log('Il y a eu une erreur...', error);
    return of([]);
  }

  private readonly regions$ = this.#http
    .get<RegionDTO[]>(this.#URL + '?fields=nom,code')
    .pipe(map(this.mapToRegion), catchError(this.handleError));

  readonly regions = toSignal(this.regions$, { initialValue: [] });

  private mapToRegion(regions: RegionDTO[]): Region[] {
    return regions.map((region) => ({
      name: region.nom,
      code: region.code,
    }));
  }

  private mapToDepartment(departments: DepartmentDTO[]): Department[] {
    return departments.map((depratment) => ({
      name: depratment.nom,
      code: depratment.code,
    }));
  }
}
