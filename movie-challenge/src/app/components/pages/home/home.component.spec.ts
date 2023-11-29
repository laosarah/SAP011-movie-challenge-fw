import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpTest: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTest = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The parameters for filtering, sorting, and pagination should follow the API standard when the site is first accessed', () => {
    expect(component.currentPage).toEqual(1);
    expect(component.selectedOrder).toBe('popularity.desc');
    expect(component.selectedGenre).toBeUndefined();
  });

  it('The parameters for filtering, sorting, and pagination should be retained after being executed once', () => {
    expect(component.currentPage).toBeGreaterThanOrEqual(1);
    expect(component.selectedOrder).not.toBeNull();
    expect(component.selectedGenre).not.toBeNull();
  })

  it('should update current page on page changed', () => {
    component.onPageChanged(3);
    expect(component.currentPage).toBe(3);
  });

  it('should update genre, order, and keyword on filter changed', () => {
    const event = { genreId: 'Action', orderBy: 'popularity.desc', keyword: 'Batman' };
    component.filterChanged(event);
    expect(component.selectedGenre).toBe('Action');
    expect(component.selectedOrder).toBe('popularity.desc');
    expect(component.keyWord).toBe('Batman');
  });
  
  it('should load movies by page', () => {
    spyOn(component['_SERVICE'], 'getMoviesByPage').and.returnValue(of({ total_pages: 2, results: [] }));
    component.loadMoviesByPage();
    expect(component['_SERVICE'].getMoviesByPage).toHaveBeenCalledWith(
      component.currentPage,
      component.selectedGenre,
      component.selectedOrder,
      component.keyWord
    );
    expect(component.totalPages).toBe(2);
  });
  
  it('should load genres', () => {
    spyOn(component['_SERVICE'], 'getMovieGenre').and.returnValue(of({ genres: ['Action', 'Drama'] }));
    component.loadGenres();
    expect(component['_SERVICE'].getMovieGenre).toHaveBeenCalled();
    expect(component.genres).toEqual(['Action', 'Drama']);
  });
  
});
