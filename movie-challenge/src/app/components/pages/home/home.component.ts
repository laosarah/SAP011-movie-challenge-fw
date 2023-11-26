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
  selectedOrder: string = 'popularity.desc';
  keyWord?: string;

  constructor(
    private readonly _SERVICE: TmdbService,
    private readonly _ROUTE: ActivatedRoute,
  ) {}

  ngOnInit(): void {
      const queryParams = this._ROUTE.snapshot.queryParamMap;
      const genreParam = queryParams.get('genre');
      const orderParam = queryParams.get('order');
      const pageNumberParam = queryParams.get('pageNumber');

    if (genreParam !== null) {
      this.selectedGenre = genreParam.toString();
    }
    if (orderParam !== null) {
      this.selectedOrder = orderParam.toString();
    }
    if (pageNumberParam !== null) {
      const parsedPageNumber = parseInt(pageNumberParam, 10);
      this.currentPage = isNaN(parsedPageNumber) ? 1 : parsedPageNumber;
    }
    
    this.loadMoviesByPage();
    this.loadGenres();
  }

  onPageChanged(page: number) {
    // console.log(page);
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

  loadMoviesWithGenre() {
    this._SERVICE.getMoviesByPage(this.currentPage, this.selectedGenre).subscribe({
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

  sortBy(sortBy: string) {
    sortBy = sortBy || 'popularity.desc';
    this._SERVICE.getMovieOrder(sortBy).subscribe({
      next: (data: any) => {
        console.log('lista ordenada', data);
        this.orderBy = data.results;
      }
    });
  }

  filterChanged(event: { genreId: string, orderBy: string, keyword: string }) {
    console.log('Filter Changed: ', event);
    const { genreId, orderBy, keyword } = event;
    this.selectedGenre = genreId;
    this.selectedOrder = orderBy;
    this.keyWord = keyword;
    this.loadMoviesByPage();
  }

  moviesWithGenre(genreId: string) {
    this._SERVICE.getSelectedGenre(genreId).subscribe({
      next: (data: any) => {
        this.moviesByGenre = data.results;
        console.log("Filmes filtrados por genero:", data);
        this.totalPages = data.total_pages;
        this.movies = data.results; 
      }
    })
  }
}
