import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _countriesService: CountriesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        // El 'id' va a depender de cómo le pusimos en el 'path' del Routing
        switchMap(({ id }) => this._countriesService.searchCountryByCode(id))
      )
      .subscribe((country) => {
        if (!country) return this._router.navigate(['']);

        console.log(country);
        return;
      });
  }
}
