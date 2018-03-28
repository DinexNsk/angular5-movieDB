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
  currentPage: number = 1;
  total_pages: number;
  total_results: number;
  imagePath:string = 'http://image.tmdb.org/t/p/w500';

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPopular();
    this.getFavorites();
    this.getGenres();
  }

  getPopular(page?:number) {
    this.movieService.getPopularMovies(page)
      .subscribe((result) => {
        this.movies = result['results'];
        /** to fix incorrect results */
        if(!page){
          this.total_pages = result['total_pages'];
          this.total_results = result['total_results'];
        }
      });
  }

  getGenres(){
    this.movieService.getGenreList()
      .subscribe((result) => {
        this.genres = result;
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

  addFavorite(id:string, title:string, poster:string, event: MouseEvent){
    event.stopPropagation();
    this.movieService.addToFavorites(id, title, poster);
    this.getFavorites()
  }

  removeFavorites(id:string, title:string, poster:string, event: MouseEvent){
    event.stopPropagation();
    this.movieService.removeFromFavorites(id, title, poster)
    this.getFavorites();
  }

  goNextOrPrevious(page:number){
    this.currentPage += page;
    this.getPopular(this.currentPage)
  }
  
  goStartOrEnd(page:number){
    this.currentPage = page;
    this.getPopular(this.currentPage);
  }
}
