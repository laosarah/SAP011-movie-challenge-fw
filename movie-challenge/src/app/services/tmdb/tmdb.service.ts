import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private readonly _KEY = 'baec311ec8ece6d0279c70ac049bdab2';
  private readonly _BASE_URL = `https://api.themoviedb.org/3/`;
  private readonly _APPEND = `?include_adult=false&language=pt&api_key=${this._KEY}&page=`;
  private readonly _SORT = `&sort_by=`;
  private readonly _GENRE = `&with_genres=`;
  private readonly _SEARCH = `&with_keywords=`;
  private readonly _DISCOVER = `${this._BASE_URL}discover/movie${this._APPEND}`;
  private readonly _ID = `${this._BASE_URL}movie`;
  private readonly _GENRELIST = `${this._BASE_URL}genre/movie/list`;

  constructor(
    private readonly _HTTP: HttpClient
  ) { }

  getMoviesByPage(page: number, genreId?: string, orderBy?: string, keyWord?: string): Observable<any> {
    console.log(`${this._DISCOVER}${page}${genreId ? this._GENRE + `${genreId}` : ``}${orderBy ? this._SORT + `${orderBy}` : ``}${keyWord ? this._SEARCH + `${keyWord}` : ``}`);
    
    return this._HTTP.get(`${this._DISCOVER}${page}${genreId ? this._GENRE + `${genreId}` : ``}${orderBy ? this._SORT + `${orderBy}` : ``}${keyWord ? this._SEARCH + `${keyWord}` : ``}`);
  }

  getMoviesById(id: number): Observable<any> {
    return this._HTTP.get(`${this._ID}/${id}?api_key=${this._KEY}`);
  }

  getMovieGenre(): Observable<any> {
    return this._HTTP.get(`${this._GENRELIST}?api_key=${this._KEY}`);
  }

  getSelectedGenre(genreId: string): Observable<any> {
    return this._HTTP.get(`${this._GENRE}&api_key=${this._KEY}&with_genres=${genreId}`);
  }

  getMovieOrder(sortBy: string): Observable<any> {
    return this._HTTP.get(`${this._SORT}?api_key=${this._KEY}&sort_by=${sortBy}`);
  }

  getMovieSearch(value: string): Observable<any> {
    return this._HTTP.get(`${this._SEARCH}?api_key=${this._KEY}&search=${value}`);
  }
 
}
