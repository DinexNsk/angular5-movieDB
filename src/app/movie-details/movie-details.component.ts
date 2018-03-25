import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Movie,Detail } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  details: Detail;
  movies: Movie[];
  idArray = new Array();
  currentPage: number = 1;
    total_pages: number;
  total_results: number;
  id: number;
  imagePath:string = 'http://image.tmdb.org/t/p/w500';

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.getDetail(this.id);
    });
    this.getSimilar(this.id, this.currentPage);
    this.getFavorites();
  }

  getDetail(id:number){
    this.movieService.getDetails(id)
      .subscribe(result => {
        this.details = result;
        console.log('Результаты в Поисковом элементе',this.details);
      }, error => console.log('error'));
  }

  getSimilar(id:number, page:number){
    this.movieService.getSimilarMovies(id, page)
      .subscribe(result => {
        this.movies = result['results'];
        this.total_pages = result['total_pages'];
        this.total_results = result['total_results'];
      }, error => console.log('error'));
  }

  goBack(): void {
    this.location.back();
  }
  
  goDetail(id: number) {
    if (id) {
      this.router.navigate(['/movie', id]);
      window.scrollTo(0, 0);
    }
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
  goNextOrPrevious(page:number){
    this.currentPage += page;
    this.getSimilar(this.id, this.currentPage)
  }
  
  goStartOrEnd(page:number){
    this.currentPage = page;
    this.getSimilar(this.id, this.currentPage);
  }


  selectEmployeeFromList(e) {
    e.stopPropagation();
    e.preventDefault();
}

}
