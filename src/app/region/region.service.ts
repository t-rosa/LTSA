import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

export interface Region {
  nom: string;
  code: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private URL = 'https://geo.api.gouv.fr/regions?fields=nom,code';
  private http = inject(HttpClient);
  regions: WritableSignal<Region[]> = signal([]);

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.URL);
  }
}
