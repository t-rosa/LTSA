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
  regionsSignal: WritableSignal<Region[]> = signal([]);
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.regionService
      .getRegions()
      .pipe(tap((data) => this.regionsSignal.set(data)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
