import { Component, inject } from '@angular/core';
import { RegionService } from './region/region.service';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [],
})
export class AppComponent {
  readonly service = inject(RegionService);

  constructor() {
    this.service.loadRegions();
  }
}
