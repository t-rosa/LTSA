import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Department {
  name: string;
  code: string;
  regionCode: string;
}

export interface DepartmentDTO {
  nom: string;
  code: string;
  codeRegion: string;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private http = inject(HttpClient);
  private URL = '';
  depratmentsSignal: WritableSignal<Department[]> = signal([]);

  getDepartmentsByRegionCode(regionCode: string): Observable<Department[]> {
    return this.http
      .get<DepartmentDTO[]>(this.URL)
      .pipe(map((data) => this.mapToDepartment(data)));
  }

  private mapToDepartment(data: DepartmentDTO[]): Department[] {
    const departements: Department[] = [];

    for (const department of data) {
      departements.push({
        name: department.nom,
        code: department.code,
        regionCode: department.codeRegion,
      });
    }

    return departements;
  }
}
