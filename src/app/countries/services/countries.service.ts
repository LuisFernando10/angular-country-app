import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private _apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private _http: HttpClient) {}

  searchCountryByCode(code: string): Observable<Country[]> {
    const url = `${this._apiUrl}/alpha/${code}`;

    return this._http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchCapital(capital: string): Observable<Country[]> {
    const url = `${this._apiUrl}/capital/${capital}`;

    return this._http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchCountry(country: string): Observable<Country[]> {
    const url = `${this._apiUrl}/name/${country}`;

    return this._http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchRegion(region: string): Observable<Country[]> {
    const url = `${this._apiUrl}/region/${region}`;

    return this._http.get<Country[]>(url).pipe(catchError(() => of([])));
  }
}
