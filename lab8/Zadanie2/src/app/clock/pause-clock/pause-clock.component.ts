import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pause-clock',
  standalone: true,
  imports: [],
  templateUrl: './pause-clock.component.html',
  styleUrl: './pause-clock.component.css'
})
export class PauseClockComponent {
  @Output() clockStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  start(): void {
    this.clockStateChange.emit(false);
  }

  pause(): void {
    this.clockStateChange.emit(true);
  }
}
