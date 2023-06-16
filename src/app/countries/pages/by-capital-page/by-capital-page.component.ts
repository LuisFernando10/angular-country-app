import { Component, EventEmitter, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent {
  constructor(private _countriesService: CountriesService) {}

  public countries: Country[] = [];

  searchByCapital(capital: string): void {
    this._countriesService.searchCapital(capital).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
