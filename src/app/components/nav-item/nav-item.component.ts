import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface MenuItem {
  label: string;
  href: string;
}

@Component({
  standalone: true,
  selector: 'al-nav-item',
  template: `<li>
    <h3>{{ menuItem.label }}</h3>
    <p>
      <ng-content />
    </p>
    <button (click)="handleClick()">log</button>
  </li>`,
})
export class NavItemComponent {
  @Input({ required: true })
  menuItem: MenuItem = { label: '', href: '' };

  @Output()
  logItem = new EventEmitter<MenuItem>();

  handleClick() {
    this.logItem.emit(this.menuItem);
  }
}
