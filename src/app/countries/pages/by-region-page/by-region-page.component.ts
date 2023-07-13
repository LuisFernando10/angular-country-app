import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Regions } from '../types/by-region';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  constructor(private _countriesService: CountriesService) {}

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public selectedRegion?: Regions;
  public regions: Regions[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  searchByRegion(region: Regions): void {
    this.isLoading = true;
    this.selectedRegion = region;

    this._countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
