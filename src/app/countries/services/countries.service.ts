import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Regions } from '../pages/types/by-region';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private _apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private _http: HttpClient) {
    this._loadFromLocalStorage();
  }

  private _getCountriesRequest(url: string): Observable<Country[]> {
    return this._http.get<Country[]>(url).pipe(
      catchError(() => of([]))
      //delay(2000) TODO: It's not neccessary anymore with the debouncer implementations
    );
  }

  private _saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private _loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  searchCountryByCode(code: string): Observable<Country | null> {
    const url = `${this._apiUrl}/alpha/${code}`;

    return this._http.get<Country[]>(url).pipe(
      map((countries) => (countries.length ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(capital: string): Observable<Country[]> {
    const url = `${this._apiUrl}/capital/${capital}`;

    return this._getCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCapital = { countries, term: capital })
      ),
      tap(() => this._saveToLocalStorage())
    );
  }

  searchCountry(country: string): Observable<Country[]> {
    const url = `${this._apiUrl}/name/${country}`;

    return this._getCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCountries = { countries, term: country })
      ),
      tap(() => this._saveToLocalStorage())
    );
  }

  searchRegion(region: Regions): Observable<Country[]> {
    const url = `${this._apiUrl}/region/${region}`;

    return this._getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byRegion = { countries, region })),
      tap(() => this._saveToLocalStorage())
    );
  }
}
