import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <form (ngSubmit)="handleSubmit()">
      <div>
        <label for="email">Adresse e-mail</label>
        <input
          name="email"
          type="email"
          placeholder="Adresse e-mail"
          [(ngModel)]="email"
        />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          [(ngModel)]="password"
        />
      </div>
      <div>
        <button type="submit">Connexion</button>
        <a [routerLink]="['/']">Retour</a>
      </div>
    </form>
  `,
})
export default class LoginComponent {
  email = signal('');
  password = signal('');

  handleSubmit() {
    console.log(this.email(), this.password());
  }
}
