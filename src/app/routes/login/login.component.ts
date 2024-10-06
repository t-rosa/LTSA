import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <form (ngSubmit)="handleSubmit()" #loginForm="ngForm">
      <div>
        <label for="email">Adresse e-mail</label>
        <input
          name="email"
          type="email"
          placeholder="Adresse e-mail"
          minlength="3"
          email
          required
          [(ngModel)]="email"
          #formEmail="ngModel"
          aria-invalid="true"
        />
      </div>
      <div [hidden]="formEmail.valid || formEmail.pristine">
        L&apos;adresse e-mail n&apos;est pas valide.
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          minlength="6"
          required
          #formPassword="ngModel"
          [(ngModel)]="password"
        />
      </div>
      <div [hidden]="formPassword.valid || formPassword.pristine">
        Le mot de passe n&apos;est pas valide.
      </div>
      <div>
        <button type="submit" [disabled]="!loginForm.form.valid">
          Connexion
        </button>
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
