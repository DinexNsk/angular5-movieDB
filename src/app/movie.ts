export class Movie {
    id: number;
    title: string;
    vote_count: string;
    vote_average: string;
    popularity: string;
    original_language: string;
    original_title: string;
    adult: string;
    overview: string;
    release_date: string;
    poster_path: string;
}

export class Genre {
    id:number;
    name:string;
}

export class Detail{
    budget: number;
    genres:Genre[];
    id: number;
    original_language: string;
    original_title: string;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    status: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
}