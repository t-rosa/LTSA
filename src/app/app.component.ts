import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokemon } from './pokemon/pokemon/pokemon.model';
import { POKEMON_LIST } from './pokemon/pokemon/pokemons.data';
import { PokemonComponent } from './pokemon/pokemon/pokemon.component';

@Component({
  selector: 'al-root',
  standalone: true,
  imports: [RouterOutlet, PokemonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  pokemons: Pokemon[] = POKEMON_LIST;
}
