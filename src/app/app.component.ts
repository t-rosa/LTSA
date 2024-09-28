import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
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
  regionService = inject(RegionService);
  private subscription = new Subscription();

  regionsSignal: WritableSignal<Region[]> = this.regionService.regionsSignal;
  selectedRegionSignal: WritableSignal<Region> =
    this.regionService.selectedRegionSignal;

  ngOnInit(): void {
    this.subscription = this.regionService
      .getRegions()
      .pipe(tap((regions) => this.regionsSignal.set(regions)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
