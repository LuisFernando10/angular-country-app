import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent {
  constructor(private _countriesService: CountriesService) {}

  public countries: Country[] = [];

  searchByCountry(country: string): void {
    this._countriesService.searchCountry(country).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
