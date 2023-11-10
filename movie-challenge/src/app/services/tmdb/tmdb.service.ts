import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private readonly _URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&language=pt&api_key=baec311ec8ece6d0279c70ac049bdab2&page='

  constructor(
    private readonly _HTTP: HttpClient
  ) { }

  getMoviesByPage(page:number): Observable<any> {
    return this._HTTP.get(`${this._URL}${page}`)
  }
}
