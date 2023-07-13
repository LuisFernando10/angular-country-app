import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Regions } from '../types/by-region';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent implements OnInit {
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

  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byRegion.countries;
    this.selectedRegion =
      this._countriesService.cacheStore.byRegion.region || '';
  }

  searchByRegion(region: Regions): void {
    this.isLoading = true;
    this.selectedRegion = region;

    this._countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
