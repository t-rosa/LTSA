import { mapQuery } from '@/lib/map-query';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Region {
  nom: string;
  code: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private readonly URL = 'https://geo.api.gouv.fr/regions';
  private readonly http = inject(HttpClient);

  loadRegionsQuery() {
    return this.http.get<Region[]>(this.URL).pipe(mapQuery());
  }
}
