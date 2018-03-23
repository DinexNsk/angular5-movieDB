import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from '../movie.service';
import { Movie, Genre } from '../movie'

@Component({
  selector: 'app-found-movies',
  templateUrl: './found-movies.component.html',
  styleUrls: ['./found-movies.component.css']
})
export class FoundMoviesComponent implements OnInit {

  movies: Movie[];
  idArray = new Array();
  total_results: number;
  total_pages: number;
  page: number;
  term: string;
  language: string;
  sort: number;

  genres: Genre[];
  imagePath: string = 'http://image.tmdb.org/t/p/w500';

  @Input() movie:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private movieService: MovieService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.term = params['name'];
        // this.page = 1;
        this.getMovie(this.term);
    });
    this.getGenres();
  }

  getMovie(term:string){
    this.movieService.searchMovie(term)
      .subscribe(result => {
        this.movies = result;
        console.log('Результаты в Поисковом элементе',this.movies);
      }, error => console.log('error'));
  }

  goDetail(id: number) {
    if (id) {
      this.router.navigate(['/movie', id]);
      window.scrollTo(0, 100);
    }
  }

  getGenres(){
    this.movieService.getGenreList()
      .subscribe((result) => {
        this.genres = result;
        console.log('All Genres', this.genres)
      });
  }
  addFavorite(id:string, title:string, poster:string){
    this.movieService.addToFavorites(id, title, poster);
    this.getFavorites()
  }

  removeFavorites(id:string, title:string, poster:string){
    this.movieService.removeFromFavorites(id, title, poster)
    this.getFavorites();
  }
  getFavorites(){
    this.idArray = JSON.parse(localStorage.getItem('listOfIds')) || [];
  }

  selectEmployeeFromList(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log("This onClick method should prevent routerLink from executing.");

    return false;
}
}
