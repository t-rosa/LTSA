import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

export interface Departement {
  nom: string;
  code: string;
}

@Injectable({
  providedIn: 'root',
})
export class DepartementService {
  private readonly URL = 'https://geo.api.gouv.fr/regions';
  private readonly http = inject(HttpClient);

  loadDepartementsByRegion(code: string) {
    return this.http
      .get<Departement[]>(
        this.URL + '/' + code + '/departements?fields=nom,code'
      )
      .pipe(
        catchError(() => {
          return of([]);
        })
      );
  }
}
