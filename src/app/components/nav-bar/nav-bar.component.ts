import { Component } from '@angular/core';
import { MenuItem, NavItemComponent } from '../nav-item/nav-item.component';

@Component({
  standalone: true,
  template: `<nav>
    <ul>
      @for(menuItem of menuItems; track menuItem.label) {
      <al-nav-item [menuItem]="menuItem" (logItem)="handleLogItem($event)">
        {{ menuItem.href }}
      </al-nav-item>
      }
    </ul>
  </nav>`,
  styles: ``,
  selector: 'al-nav-bar',
  imports: [NavItemComponent],
})
export class NavBarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Accueil',
      href: '/home',
    },
    {
      label: 'Carte',
      href: '/map',
    },
    {
      label: 'Régions',
      href: '/regions',
    },
  ];

  handleLogItem(menuItem: MenuItem) {
    alert(menuItem.label);
  }
}
