import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
   ) { }

  ngOnInit() {
  }

  search(query: string) {
    if (/\S/.test(query)) {
      this.router.navigate(['/found', query]);
    }
  }
  goBack(): void {
    this.location.back();
  }
}
