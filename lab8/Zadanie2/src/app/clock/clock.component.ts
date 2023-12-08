import { Component } from '@angular/core';
import { ResetClockComponent } from './reset-clock/reset-clock.component';
import { PauseClockComponent } from './pause-clock/pause-clock.component';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [ResetClockComponent, PauseClockComponent],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent {
  secondsString: string = "00";
  minutesString: string = "00";
  
  startTime: Date = new Date();

  lastStopClockTime: Date = new Date();
  totalStopClockTime: number = 0;

  functionInterval: ReturnType<typeof setTimeout> | undefined;

  _toTimeNumber(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  _setSecondAndMinutes(): void {
    const timeIntervalMs = new Date().getTime() - this.startTime.getTime() - this.totalStopClockTime;
    const timeIntervalSeconds = Math.floor(timeIntervalMs / 1000);

    this.secondsString = this._toTimeNumber(timeIntervalSeconds % 60);
    this.minutesString = this._toTimeNumber(Math.floor(timeIntervalSeconds / 60));
  }

  constructor() {
    this.functionInterval = setInterval(() => {
      this._setSecondAndMinutes();
    }, 100);
  }

  resetClock(): void {
    this.startTime = new Date();
    this.totalStopClockTime = 0;
    this.lastStopClockTime = new Date();
    this._setSecondAndMinutes();
  }

  toggleClock(shouldBePaused: boolean): void {
    if (shouldBePaused && this.functionInterval) {
      if (this.functionInterval) {
        clearInterval(this.functionInterval);
      }

      this.functionInterval = undefined;
      this.lastStopClockTime = new Date();
    } else if (!this.functionInterval) {
      if (this.lastStopClockTime) {
        this.totalStopClockTime += new Date().getTime() - this.lastStopClockTime.getTime();
      }

      this._setSecondAndMinutes();

      this.functionInterval = setInterval(() => {
        this._setSecondAndMinutes();
      }, 100);
    }
  }
}
