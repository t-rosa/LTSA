import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry } from 'rxjs';

export interface Region {
  nom: string;
  code: string;
}

interface RegionsState {
  regions: Region[];
  status: 'loading' | 'error' | 'success';
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private readonly URL = 'https://geo.api.gouv.fr/regions';
  private readonly http = inject(HttpClient);

  loadRegionsState(): Observable<RegionsState> {
    return this.http
      .get<Region[]>(this.URL)
      .pipe(retry(3), map(this.mapToState), catchError(this.handleError));
  }

  private mapToState(regions: Region[]): RegionsState {
    return {
      regions,
      status: 'success',
      error: undefined,
    };
  }

  private handleError(error: HttpErrorResponse) {
    const errorState: RegionsState = {
      regions: [],
      status: 'error',
      error: error.message,
    };

    return of(errorState);
  }
}
