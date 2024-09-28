import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { tap } from 'rxjs';
import { Region, RegionService } from './region/region.service';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent implements OnInit {
  private regionService = inject(RegionService);
  regionsSignal: WritableSignal<Region[]> = signal([]);

  ngOnInit(): void {
    this.regionService
      .getRegions()
      .pipe(tap((data) => this.regionsSignal.set(data)))
      .subscribe();
  }
}
