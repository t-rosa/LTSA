import { Component, signal } from '@angular/core';

@Component({
  selector: 'al-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent {
  name = '';
  life = signal(0);

  incrementLife() {
    this.life.update((life) => life + 1);
  }

  decrementLife() {
    this.life.update((life) => life - 1);
  }
}
