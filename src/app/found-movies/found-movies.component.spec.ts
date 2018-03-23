import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundMoviesComponent } from './found-movies.component';

describe('FoundMoviesComponent', () => {
  let component: FoundMoviesComponent;
  let fixture: ComponentFixture<FoundMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
