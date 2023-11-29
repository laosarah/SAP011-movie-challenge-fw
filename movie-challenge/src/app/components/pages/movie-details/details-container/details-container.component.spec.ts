import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsContainerComponent } from './details-container.component';
import { NgxSpinnerService } from 'ngx-spinner';

describe('DetailsContainerComponent', () => {
  let component: DetailsContainerComponent;
  let fixture: ComponentFixture<DetailsContainerComponent>;
  let _SPINNER: NgxSpinnerService;
  let movie: any = {
    poster_path: 'path to image',
    title: 'movie title',
    vote_averege: '5',
    release_date: '09-10-2022',
    genres: [
      {
        name: 'horror'
      },
      {
        name: 'drama'
      }
    ],
    overview: 'movie overview'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailsContainerComponent
      ]
    });
    fixture = TestBed.createComponent(DetailsContainerComponent);
    component = fixture.componentInstance;
    component.movie = movie;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    // fixture.detectChanges();
    console.log(component.movie);

    expect(component).toBeTruthy();
  });
});
