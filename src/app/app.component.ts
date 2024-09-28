import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { DepartmentService } from './department/department.service';
import { Region, RegionService } from './region/region.service';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AppComponent implements OnInit, OnDestroy {
  private regionService = inject(RegionService);
  private departmentService = inject(DepartmentService);
  private regions$ = this.regionService.getRegions();
  private regionSubscription!: Subscription;

  regionsFilterControl = new FormControl('');

  regions: Region[] = [];
  regionsSignal = this.regionService.regions;

  selectedRegion = this.regionService.selectedRegion;
  selectRegionByName = this.regionService.selectRegionByName;

  regionDepartments = this.departmentService.regionDepartments;

  ngOnInit(): void {
    this.regionSubscription = this.regions$.subscribe(
      (data) => (this.regions = data)
    );

    this.regionsFilterControl.valueChanges
      .pipe(
        tap((data) => {
          this.regionsSignal.set(
            this.regions.filter((region) =>
              region.name
                .toLowerCase()
                .startsWith(data ? data.toLowerCase() : '')
            )
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.regionSubscription.unsubscribe();
  }
}
