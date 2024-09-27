import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon/pokemon.component';
import { RegionService } from './region/region.service';

@Component({
  selector: 'al-root',
  standalone: true,
  imports: [RouterOutlet, PokemonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.regionService.getRegions().subscribe();
  }

  regionService = inject(RegionService);
}
