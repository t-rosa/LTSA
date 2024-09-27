import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface Region {
  nom: string;
  code: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private URL = 'https://geo.api.gouv.fr/regions?fields=nom,code';
  private http = inject(HttpClient);

  getRegions(): Observable<Region[]> {
    return this.http
      .get<Region[]>(this.URL)
      .pipe(tap((data) => console.log(data)));
  }
}
