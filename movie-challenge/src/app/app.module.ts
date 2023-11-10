import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/commons/menu/menu.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { TmdbService } from './services/tmdb/tmdb.service';
import { HomeModule } from './components/pages/home/home.module';
import { MovieDetailsModule } from './components/pages/movie-details/movie-details.module';
// import { PaginationComponent } from './components/pages/home/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    // PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    MovieDetailsModule
  ],
  providers: [
    TmdbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
