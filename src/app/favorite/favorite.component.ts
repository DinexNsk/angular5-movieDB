import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { Movie } from '../movie'
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  movies = JSON.parse(localStorage.getItem('favorites')) || [];
  imagePath:string = 'http://image.tmdb.org/t/p/w500';
  
  constructor(
    private movieService: MovieService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getFavorites()
  }

  getFavorites(){
    this.movies = JSON.parse(localStorage.getItem('favorites')) || [];
  }
  goDetail(id: number) {
    if (id) {
      this.router.navigate(['/movie', id]);
      window.scrollTo(0, 100);
    }
  }
  removeFavorites(id:string, title:string, poster:string, event: MouseEvent){
    event.stopPropagation();
    var ask = confirm(`Are you sure want to delete ${title}`);
    if (!ask) return;
    this.movieService.removeFromFavorites(id, title, poster);
    this.movies = JSON.parse(localStorage.getItem('favorites')) || [];
  }
}
