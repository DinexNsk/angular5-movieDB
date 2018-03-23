import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { MovieService } from './movie.service';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { AppRoutingModule } from './/app-routing.module';
import { FoundMoviesComponent } from './found-movies/found-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavoriteComponent } from './favorite/favorite.component';


@NgModule({
  declarations: [
    AppComponent,
    PopularMoviesComponent,
    MovieSearchComponent,
    FoundMoviesComponent,
    MovieDetailsComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})

export class AppModule { }
