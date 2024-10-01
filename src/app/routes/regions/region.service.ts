import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, Observable, of, retry } from 'rxjs';

export interface Region {
  nom: string;
  code: string;
}

interface Query {
  status: 'pending' | 'loading' | 'error' | 'success';
  error?: HttpErrorResponse;
}

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private readonly URL = 'https://geo.api.gouv.fr/regions';
  private readonly http = inject(HttpClient);
  readonly query = signal<Query>({ status: 'pending' });

  private loadRegions(): Observable<Region[]> {
    this.query.set({ status: 'loading' });

    return this.http.get<Region[]>(this.URL).pipe(
      retry(3),
      catchError((error) => {
        console.error(error);
        this.query.set({ status: 'error', error });
        return of([]);
      }),
      finalize(
        () =>
          this.query().status === 'loading' &&
          this.query.set({ status: 'success' })
      )
    );
  }

  readonly regions = toSignal(this.loadRegions());
}
