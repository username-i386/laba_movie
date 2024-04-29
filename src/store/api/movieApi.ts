import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { 
    IGenreResponse, 
    IGetCreditsByIdResponse, 
    IGetMovieByIdResponse, 
    IGetMovieByQueryParam, 
    IGetMovieListParam, 
    IGetVideosByIdResponse, 
    IGetVideosByIdTransformResponse, 
    IMovieApiResponse, 
    IMovieByGenresResponse, 
    ITransformMovieApiResponse,
} from "../types/movieApiTypes";

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjVlZjIyOTcyZDJhNDRmZTlhODdhNjA4ZWQ1ODFmOSIsInN1YiI6IjY2Mjg2YmRjMjJkZjJlMDE2NTg3MmIzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nimJ1AAhMdxaV6KxZc8r2nWefsDr-0VbaK6AOzLXCQI';

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getMovieGenres: builder.query<IGenreResponse, void>({
            query: () => ({
                url: 'genre/movie/list',
                method: 'GET',
                params: {
                    // api_key: API_KEY,
                    language: 'ru'
                },
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: TOKEN,
                },
            }),
        }),
        getMovieList: builder.query<ITransformMovieApiResponse, IGetMovieListParam>({
            query: (params) => ({
                url: `/movie/${params.endpoints}`,
                method: 'GET',
                params: {
                    // api_key: API_KEY,
                    page: params.page,
                    language: 'ru'
                },
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: TOKEN,
                },
            }),
            transformResponse: (response: IMovieApiResponse): ITransformMovieApiResponse => ({
                response: response.results,
                totalPages: response.total_pages,
            }),
        }),
        getMovieListByGenre: builder.query<IMovieByGenresResponse, IGetMovieByQueryParam>({
            query: (param) => ({
                url: `/discover/movie`,
                method: 'GET',
                params: {
                    // api_key: API_KEY,
                    language: 'ru',
                    sort_by: 'popularity.desc',
                    with_genres: param.query,
                    page: param.page,
                },
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: TOKEN,
                },
            }),
            transformResponse: (response: IMovieApiResponse): IMovieByGenresResponse => ({
                page: response.page,
                total_pages: response.total_pages,
                total_results: response.total_results,
                results: response.results,
            }),
        }),
        getMovieListByTitle: builder.query<ITransformMovieApiResponse, IGetMovieByQueryParam>({
            query: (param) => ({
                url: `/search/movie`,
                method: 'GET',
                params: {
                    // api_key: API_KEY,
                    language: 'ru',
                    query: param.query,
                    page: param.page,
                },
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: TOKEN,
                },
            }),
            transformResponse: (response: IMovieApiResponse): ITransformMovieApiResponse => ({
                response: response.results,
                totalPages: response.total_pages,
            }),
        }),
        getMovieById: builder.query<IGetMovieByIdResponse, string>({
            query: (movieId) => ({
                url: `movie/${movieId}`,
                method: 'GET',
                params: {
                    language: 'ru',
                },
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: TOKEN,
                },
            }),
        }),
        getSimilarMoviesById: builder.query<IMovieByGenresResponse, IGetMovieByQueryParam>({
            query: (params) => ({
                url: `movie/${params.query}/similar`,
                method: 'GET',
                params: {
                    language: 'ru',
                    page: params.page,
                },
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: TOKEN,
                },
            }),
            transformResponse: (response: IMovieApiResponse): IMovieByGenresResponse => ({
                page: response.page,
                total_pages: response.total_pages,
                total_results: response.total_results,
                results: response.results,
            }),
        }),
        getVideosById: builder.query<IGetVideosByIdTransformResponse, string>({
            query: (movieId) => ({
                url: `movie/${movieId}/videos`,
                method: 'GET',
                params: {
                    language: 'en',
                },
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: TOKEN,
                },
            }),
            transformResponse: (response: IGetVideosByIdResponse): IGetVideosByIdTransformResponse => {
                const videos =  response.results.map(video => {
                    return {
                        videoId: video.key,
                        title: video.name,
                        site: video.site,
                    }
                });
                return {
                    movieId: response.id,
                    videos,
                }
            },
        }),
        getCreditsById: builder.query<IGetCreditsByIdResponse, string>({
            query: (movieId) => ({
                url: `movie/${movieId}/credits`,
                method: 'GET',
                params: {
                    language: 'ru',
                },
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: TOKEN,
                },
            }),
        }),
    }),
});

export const { 
    useGetMovieGenresQuery,
    useGetMovieListQuery,
    useGetMovieListByGenreQuery,
    useGetMovieListByTitleQuery,
    useGetMovieByIdQuery,
    useGetSimilarMoviesByIdQuery,
    useGetVideosByIdQuery,
    useGetCreditsByIdQuery,
} = movieApi;