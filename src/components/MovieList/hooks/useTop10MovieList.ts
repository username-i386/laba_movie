import { useGetMovieListQuery } from "../../../store/api/movieApi";
import { IGetMovieListParam, IMovie, ITransformMovieApiResponse } from "../../../store/types/movieApiTypes";


export const useTop10MovieList = (params: IGetMovieListParam) => {

    const response = useGetMovieListQuery(params, {
        selectFromResult: ({data, isLoading, isError}) => ({
            topRatedMovieList: getTop10Movies(data),
            isLoading,
            isError,
        }),
    });

    return response;
}

const getTop10Movies = (data: ITransformMovieApiResponse | undefined): IMovie[] => {
    const movies: IMovie[] = [];

    data?.response.map((movie: IMovie, index) => {
        if (index < 10) {
            movies.push(movie);
        }
    });

    return movies;
}