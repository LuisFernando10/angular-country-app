import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
  private _apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private _http: HttpClient) {}

  searchCapital(query: string): Observable<Country[]> {
    const url = `${this._apiUrl}/capital/${query}`;

    return this._http.get<Country[]>(url);
  }
}
