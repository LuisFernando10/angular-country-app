import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  constructor(private _countriesService: CountriesService) {}

  public countries: Country[] = [];

  searchByRegion(region: string): void {
    this._countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
