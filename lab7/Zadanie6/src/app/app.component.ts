import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  divColors: string[] = ['transparent', 'transparent', 'transparent'];

  onActivate(index: number) {
    const currentColor = this.divColors[index];

    this.divColors[index] = currentColor === 'transparent' ? 'red' : 'transparent';
  }
}
