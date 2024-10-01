import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'al-root',
  template: '<router-outlet/>',
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {}
