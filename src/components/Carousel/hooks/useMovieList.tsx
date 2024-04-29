import { useGetMovieListQuery } from "../../../store/api/movieApi";
import { IGetMovieListParam } from "../../../store/types/movieApiTypes";


export const useMovieList = (movieListParams: IGetMovieListParam) => {
    const response = useGetMovieListQuery(movieListParams, {
        selectFromResult: ({data, isLoading, isError}) => ({
            plaingMovieList: data?.response,
            isLoading,
            isError,
        }),
    });

    return response;
}