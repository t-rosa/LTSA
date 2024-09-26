import { Component, signal, Signal } from '@angular/core';
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
  pokemons: Signal<Pokemon[]> = signal(POKEMON_LIST);
  size(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }

    if (pokemon.life >= 25) {
      return 'Grand';
    }

    return 'Moyen';
  }
}
