import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Region, RegionService } from './region/region.service';
import { Subscription, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent implements OnInit, OnDestroy {
  private regionService = inject(RegionService);
  regionsSignal: WritableSignal<Region[]> = signal([]);
  private subscription = new Subscription();

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
