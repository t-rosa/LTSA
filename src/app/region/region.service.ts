import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

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
  private URL = 'https://geo.api.gouv.fr/regions?fields=nom,code';
  private http = inject(HttpClient);

  getRegions(): Observable<Region[]> {
    return this.http
      .get<RegionDTO[]>(this.URL)
      .pipe(map((regions) => this.mapToRegion(regions)));
  }

  mapToRegion(data: RegionDTO[]): Region[] {
    const regions: Region[] = [];

    for (const element of data) {
      const region: Region = {
        name: element.nom,
        code: element.code,
      };

      regions.push(region);
    }

    return regions;
  }
}
