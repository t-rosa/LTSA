import { Component, computed, signal } from '@angular/core';

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
