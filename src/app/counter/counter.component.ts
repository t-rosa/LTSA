import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'al-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => {
      console.log('run when update?');
      console.log('counter', this.counter());
    });
  }

  incrementCounter() {
    this.counter.update((counter) => counter + 1);
  }

  decrementCounter() {
    this.counter.update((counter) => counter - 1);
  }

  reset() {
    this.counter.set(0);
  }
}
