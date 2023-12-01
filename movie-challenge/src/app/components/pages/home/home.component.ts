import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 0;
  movies: any[] = [];
  genres: any[] = [];
  orderBy: any[] = [];
  moviesByGenre: any[] = [];
  selectedGenre?: string;
  selectedOrder?: string = 'popularity.desc';
  keyWord?: string;

  constructor(
    private readonly _SERVICE: TmdbService,
    private readonly _ROUTE: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const queryParams = this._ROUTE.snapshot.queryParamMap;

    if (
      queryParams.get('genre') !== null &&
      queryParams.get('order') !== null &&
      queryParams.get('pageNumber') !== null
    ) {
      this.selectedGenre = queryParams.get('genre')?.toString();
      this.selectedOrder = queryParams.get('order')?.toString();

      const pageNumberParam = queryParams.get('pageNumber');
      this.currentPage = pageNumberParam !== null ? parseInt(pageNumberParam, 10) : 1;
    }

    this.loadMoviesByPage();
    this.loadGenres();
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadMoviesByPage();
  }

  loadMoviesByPage() {
    const filterGenre = this.selectedGenre !== '0' ? this.selectedGenre : undefined;
    const searchBy = this.keyWord ? this.keyWord : undefined;

    this._SERVICE.getMoviesByPage(
      this.currentPage,
      filterGenre, 
      this.selectedOrder, 
      searchBy 
      ).subscribe({
      next: (data: any) => {
        this.totalPages = data.total_pages;
        this.movies = data.results;
      } 
    })
  }

  loadGenres() {
    this._SERVICE.getMovieGenre().subscribe({
      next: (data: any) => {
        this.genres = data.genres;
      } 
    })
  }

  filterChanged(event: { genreId: string, orderBy: string, keyword: string }) {
    const { genreId, orderBy, keyword } = event;
    this.selectedGenre = genreId;
    this.selectedOrder = orderBy;
    this.keyWord = keyword;
    this.loadMoviesByPage();
  }

}
