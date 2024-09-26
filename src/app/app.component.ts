import { Component, computed, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type PokemonSize = 'Petit' | 'Moyen' | 'Grand';

@Component({
  selector: 'al-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  name = 'Pikachu';
  life = signal(26);
  size: Signal<PokemonSize> = computed(() => {
    if (this.life() <= 15) {
      return 'Petit';
    }

    if (this.life() > 15 && this.life() < 25) {
      return 'Moyen';
    }

    return 'Grand';
  });

  color = computed(() => {
    if (this.life() <= 15) {
      return 'bg-green-500';
    }

    if (this.life() > 15 && this.life() < 25) {
      return 'bg-yellow-500';
    }

    return 'bg-red-500';
  });
  incrementLife() {
    this.life.update((life) => life + 1);
  }

  decrementLife() {
    this.life.update((life) => life - 1);
  }
}
