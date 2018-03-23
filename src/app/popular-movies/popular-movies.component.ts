import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { MovieService } from '../movie.service';
import { Movie, Genre} from '../movie';

import { Observable } from 'rxjs/Observable'
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css']
})
export class PopularMoviesComponent implements OnInit {

  movies: Movie[];
  genres:Genre[];
  idArray = new Array();
  currentPage:number = 1;
  imagePath:string = 'http://image.tmdb.org/t/p/w500';
  /** PAGINATION */
  displayedColumns = ['title', 'id', 'popularity', 'release_date'];

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPopular(this.currentPage);
    this.getFavorites();
    this.getGenres();
  }

  getPopular(page:number) {
    this.movieService.getPopularMovies(page)
      .subscribe((result) => {
        this.movies = result;
        console.log("Popular movies:",this.movies);
      });
  }
  getGenres(){
    this.movieService.getGenreList()
      .subscribe((result) => {
        this.genres = result;
        console.log('All Genres', this.genres)
      });
  }
  goDetail(id: number) {
    if (id) {
      this.router.navigate(['/movie', id]);
      window.scrollTo(0, 100);
    }
  }
  getFavorites(){
    this.idArray = JSON.parse(localStorage.getItem('listOfIds')) || [];
  }
  addFavorite(id:string, title:string, poster:string){
    this.movieService.addToFavorites(id, title, poster);
    this.getFavorites()
  }
  removeFavorites(id:string, title:string, poster:string){
    this.movieService.removeFromFavorites(id, title, poster)
    this.getFavorites();
  }
  selectEmployeeFromList(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log("This onClick method should prevent routerLink from executing.");
  }
}