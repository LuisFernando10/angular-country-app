import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent implements OnInit {
  constructor(private _countriesService: CountriesService) {}

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialTerm: string = '';

  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byCountries.countries;
    this.initialTerm = this._countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(country: string): void {
    this.isLoading = true;

    this._countriesService.searchCountry(country).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
