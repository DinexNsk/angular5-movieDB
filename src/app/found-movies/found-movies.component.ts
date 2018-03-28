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
  genres: Genre[];
  idArray = new Array();
  total_results: number;
  total_pages: number;
  currentPage: number = 1;
  term: string;
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
        this.getMovie(this.term);
    });
    this.getGenres();
  }

  getMovie(term:string, page?: number){
    this.movieService.searchMovie(term, page)
      .subscribe(result => {
        this.movies = result['results'];
        if(!page){
          this.total_pages = result['total_pages'];
          this.total_results = result['total_results'];
        };
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

  getFavorites(){
    this.idArray = JSON.parse(localStorage.getItem('listOfIds')) || [];
  }

  goNextOrPrevious(page:number){
    this.currentPage += page;
    this.getMovie(this.term,this.currentPage)
  }
  
  goStartOrEnd(page:number){
    this.currentPage = page;
    this.getMovie(this.term,this.currentPage);
  }
}
