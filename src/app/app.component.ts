import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Region, RegionService } from './region/region.service';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent implements OnInit, OnDestroy {
  private regionService = inject(RegionService);
  private subscription = new Subscription();

  regionsSignal: WritableSignal<Region[]> = signal([]);
  selectedRegionSignal: WritableSignal<Region> = signal({
    name: 'N/A',
    code: 'N/A',
  });

  ngOnInit(): void {
    this.subscription = this.regionService
      .getRegions()
      .pipe(tap((regions) => this.regionsSignal.set(regions)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectRegionByName(name: string) {
    const newRegion = this.regionsSignal().find(
      (region) => region.name === name
    );

    if (!newRegion) return;

    this.selectedRegionSignal.set(newRegion);
  }
}
