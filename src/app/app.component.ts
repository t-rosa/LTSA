import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'al-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'LTSA';
  name = 'Pikachu';
  life = 26;

  incrementLife() {
    this.life++;
  }

  decrementLife() {
    this.life--;
  }
}
