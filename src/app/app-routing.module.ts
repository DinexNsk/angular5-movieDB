import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { FoundMoviesComponent } from './found-movies/found-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [
  { path: '', redirectTo: '/popular', pathMatch: 'full' },
  { path: 'popular', component: PopularMoviesComponent },
  { path: 'found/:name',  component: FoundMoviesComponent},
  { path: 'movie/:id', component: MovieDetailsComponent},
  { path: 'favorite', component: FavoriteComponent}
];

@NgModule({
  imports:[ RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
