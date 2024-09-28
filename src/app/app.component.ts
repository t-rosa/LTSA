import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  regions$: Observable<Region[]> = new Observable<Region[]>();

  ngOnInit(): void {
    this.regions$ = this.regionService.getRegions();
  }
}
