import { HttpClient } from '@angular/common/http';
import {
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { RegionService } from '../region/region.service';

export interface Department {
  name: string;
  code: string;
}

export interface DepartmentDTO {
  nom: string;
  code: string;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private http = inject(HttpClient);
  private regionService = inject(RegionService);
  private BASE_URL = 'https://geo.api.gouv.fr/regions';
  private selectedRegion = this.regionService.selectedRegion;

  regionDepartments: WritableSignal<Department[]> = signal([]);

  private departmentsEffect = effect(() => {
    if (this.selectedRegion().code === 'N/A') return;
    this.getDepartmentsByRegionCode().subscribe((departments) => {
      console.log(departments);
      this.regionDepartments.set(departments);
    });
  });

  private getDepartmentsByRegionCode(): Observable<Department[]> {
    return this.http
      .get<DepartmentDTO[]>(
        `${this.BASE_URL}/${
          this.selectedRegion().code
        }/departements?fields=nom,code`
      )
      .pipe(map((data) => this.mapToDepartment(data)));
  }

  private mapToDepartment(data: DepartmentDTO[]): Department[] {
    const departements: Department[] = [];

    for (const department of data) {
      departements.push({
        name: department.nom,
        code: department.code,
      });
    }

    return departements;
  }
}
