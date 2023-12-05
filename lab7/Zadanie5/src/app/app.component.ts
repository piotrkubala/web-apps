import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  countries: Country[] = [];

  country: string = "";

  addCountry() {
    if (this.country == "") {
      return;
    }

    const newCountry = new Country(this.country);
    this.countries.push(newCountry);
    this.country = "";
  }

  removeCountry(index: number) {
    this.countries.splice(index, 1);
  }
}

class Country {
  name: string;
  name_contains_a_or_r: boolean;
  name_longer_than_6: boolean;

  constructor(name: string) {
    this.name = name;
    this.name_contains_a_or_r = name.includes("a") || name.includes("r");
    this.name_longer_than_6 = name.length > 6;
  }

  toString(): string {
    return this.name;
  }

  getColorName(index: number): string {
    if (index % 2 == 0) {
      if (this.name_contains_a_or_r) {
        return "blue";
      }
      return "yellow";
    } else {
      if (this.name_longer_than_6) {
        return "orange";
      }
      return "grey";
    }
  }
}