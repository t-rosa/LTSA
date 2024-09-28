import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonComponent } from './pokemon/pokemon/pokemon.component';
import { Region, RegionService } from './region/region.service';

@Component({
  selector: 'al-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PokemonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private regionService = inject(RegionService);
  regions$: Observable<Region[]> = new Observable<Region[]>();

  ngOnInit(): void {
    this.regions$ = this.regionService.getRegions();
  }
}
