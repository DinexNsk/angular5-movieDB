import { Injectable } from '@angular/core';
import { Movie, Detail } from './movie';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {

  private API = 'api_key=b6ac0923fb1b3c970f21e4cf3e3f5453';
  private adress = 'https://api.themoviedb.org/3/';
  private popular_movie = 'movie/popular?';
  private search_movie = 'search/movie?';
  private genres = `${this.adress}genre/movie/list?${this.API}&language=ru`;

  private popularUrl = `${this.adress}${this.popular_movie}${this.API}&language=ru`;
  private searchUrl = `${this.adress}${this.search_movie}${this.API}`;

  constructor(private http: HttpClient) { }

  getPopularMovies(page:number):Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.popularUrl}&page=${page}`)
  };

  getDetails(id:number):Observable<Detail>{
    return this.http.get<Detail>(`${this.adress}movie/${id}?${this.API}&language=ru`)
  }

  getSimilarMovies(id:number):Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.adress}movie/${id}/similar?${this.API}&language=ru`)
  }

  searchMovie(term:string, page?:number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.searchUrl}&query=${term}&page=${page}`)
      .map(result => result['results'])
  };

  getGenreList(){
    return this.http.get(this.genres)
      .map(result => result['genres'])
  }

  removeFromFavorites(id:string, title:string, poster:string){
      var idArray = new Array();
      var favorites = new Array();
      var index: number;
      let element:any;
      /** delete index from id */
      idArray = JSON.parse(localStorage.getItem('listOfIds')) || [];
      if(!idArray.includes(id)){
        console.log("Perhaps Some error, cause data not exists")
        return;
      };
      index = idArray.indexOf(id);
      idArray.splice(index, 1);
      localStorage.setItem('listOfIds', JSON.stringify(idArray));
      /** delete favorite */
      favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      for(element in favorites){
        for(let keys in element){
          if (favorites[element].indexOf(id) !== -1){
            index = element;
            break;
          }
        }
      }
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites))
  }
  
  addToFavorites(id:string, title:string, poster:string){
    var idArray = new Array();
    var favorites = new Array();
    /** Adding id to secondary localItem */
    idArray = JSON.parse(localStorage.getItem('listOfIds')) || [];
    if(idArray.includes(id)){
      console.log("ALREADY EXISTS!!")
      return;
    }
    idArray.push(id);
    localStorage.setItem('listOfIds', JSON.stringify(idArray));
    /** Adding local data */
    favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push([id, title, poster]);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

}
