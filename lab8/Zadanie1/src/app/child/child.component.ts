import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  @Input() colors: string[] = [];
  @Output() currentColorChange: EventEmitter<string> = new EventEmitter<string>();

  selectedColor: string = 'white';

  constructor() {}

  changeColor() {
    this.currentColorChange.emit(this.selectedColor);
  }
}
