import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DepartmentService } from './department/department.service';
import { RegionService } from './region/region.service';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent implements OnInit, OnDestroy {
  private regionService = inject(RegionService);
  private departmentService = inject(DepartmentService);
  private regions$ = this.regionService.getRegions();
  private subscription!: Subscription;

  regions = this.regionService.regions;
  selectedRegion = this.regionService.selectedRegion;
  selectRegionByName = this.regionService.selectRegionByName;
  regionDepartments = this.departmentService.regionDepartments;

  ngOnInit(): void {
    this.subscription = this.regions$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
