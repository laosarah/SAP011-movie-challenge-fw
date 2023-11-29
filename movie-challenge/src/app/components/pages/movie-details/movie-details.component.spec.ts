import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let httpTest: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieDetailsComponent
      ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(MovieDetailsComponent);
    httpTest = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
