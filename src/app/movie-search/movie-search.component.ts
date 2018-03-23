import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  constructor(private router: Router ) { }
  

  search(query: string) {
    if (/\S/.test(query)) {
      this.router.navigate(['/found', query]);
    }
  }

  ngOnInit() {
  }

}
