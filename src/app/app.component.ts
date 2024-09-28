import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DepartmentService } from './department/department.service';
import { Region, RegionService } from './region/region.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AppComponent implements OnInit, OnDestroy {
  private regionService = inject(RegionService);
  private departmentService = inject(DepartmentService);
  private regions$ = this.regionService.getRegions();
  private regionSubscription!: Subscription;

  filterBy: WritableSignal<string> = signal('');

  regions: Region[] = [];
  regionsSignal = this.regionService.regions;

  selectedRegion = this.regionService.selectedRegion;
  selectRegionByName = this.regionService.selectRegionByName;

  regionDepartments = this.departmentService.regionDepartments;

  filterEffect = effect(() => {
    this.regions = this.regionsSignal().filter((region) =>
      region.name.toLowerCase().startsWith(this.filterBy().toLowerCase())
    );
  });

  ngOnInit(): void {
    this.regionSubscription = this.regions$.subscribe(
      (regions) => (this.regions = regions)
    );
  }

  ngOnDestroy(): void {
    this.regionSubscription.unsubscribe();
    this.filterEffect.destroy();
  }
}
