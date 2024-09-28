import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { Region, RegionService } from './region/region.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent implements OnInit, OnDestroy {
  private regionService = inject(RegionService);
  private regions$ = this.regionService.getRegions();
  private subscription!: Subscription;

  regionsSignal: WritableSignal<Region[]> = this.regionService.regionsSignal;
  selectedRegionSignal: WritableSignal<Region> =
    this.regionService.selectedRegionSignal;

  selectRegionByName = this.regionService.selectRegionByName;

  ngOnInit(): void {
    this.subscription = this.regions$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
