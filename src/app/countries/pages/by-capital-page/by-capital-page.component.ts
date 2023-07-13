import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent implements OnInit {
  constructor(private _countriesService: CountriesService) {}

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialTerm: string = '';

  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byCapital.countries;
    this.initialTerm = this._countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(capital: string): void {
    this.isLoading = true;

    this._countriesService.searchCapital(capital).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
