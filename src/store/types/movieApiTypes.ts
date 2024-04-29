// Movie list response -------------------------------------------------------------------------------------------------------------

export interface ITransformMovieApiResponse {
    response: IMovie[]
    totalPages: number,
}

export interface IGetMovieListParam {
    endpoints: 'top_rated' | 'now_playing' | 'popular'
    page: number
}


export interface IMovieApiResponse {
    dates: {
        maximum: string
        minimum: string
    }
    page: number
    total_pages: number
    total_results: number
    results: IMovie[]
}

export interface IMovie {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

// get Movie Genres response-------------------------------------------------------------------------------------------------------------

export interface IGenreResponse {
    genres: IGenre[]
}

export interface IGenre {
    id: number
    name: string
}

// get movies by query -------------------------------------------------------------------------------------------------------------

export interface IGetMovieByQueryParam {
    page: string
    query: string
}

export interface IMovieByGenresResponse {
    page: number
    total_pages: number
    total_results: number
    results: IMovie[]
}

// get movie by id -------------------------------------------------------------------------------------------------------------

export interface IGetMovieByIdResponse {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: any
    budget: number
    genres: IGenre[]
    homepage: string
    id: number
    imdb_id: string
    origin_country: string[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: IProductionCompany[]
    production_countries: IProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: ISpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

interface IProductionCompany {
    id: number
    logo_path?: string
    name: string
    origin_country: string
}

interface IProductionCountry {
    iso_3166_1: string
    name: string
}

interface ISpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

// get video by id -------------------------------------------------------------------------------------------------------------

export interface IGetVideosByIdTransformResponse {
    movieId: number
    videos: ITransformVideo[]
}

export interface ITransformVideo {
    videoId: string
    title: string
    site: string
}

export interface IGetVideosByIdResponse {
    id: number
    results: IVideo[]
}

export interface IVideo {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    published_at: string
    site: string
    size: number
    type: string
    official: boolean
    id: string
}

// get cast by id -------------------------------------------------------------------------------------------------------------

export interface IGetCreditsByIdResponse {
    id: number
    cast: ICast[]
    crew: ICrew[]
}

export interface ICast {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface ICrew {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    credit_id: string
    department: string
    job: string
}
