import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reset-clock',
  standalone: true,
  imports: [],
  templateUrl: './reset-clock.component.html',
  styleUrl: './reset-clock.component.css'
})
export class ResetClockComponent {
  @Output() resetChange: EventEmitter<void> = new EventEmitter<void>();

  resetClock(): void {
    this.resetChange.emit();
  }
}
