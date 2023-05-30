import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent {
  searchByCapital(capital: string): void {
    console.log(capital);
  }
}
