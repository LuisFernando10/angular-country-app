import { Regions } from '../pages/types/by-region';
import { Country } from './country';

export interface CacheStore {
  byCapital: TermCountries;
  byCountries: TermCountries;
  byRegion: RegionCountries;
}

export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  region?: Regions;
  countries: Country[];
}
