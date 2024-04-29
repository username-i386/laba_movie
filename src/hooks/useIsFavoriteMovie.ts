import { useAppSelector } from "../store/hooks/useAppSelector";


export const useIsFavoriteMovie = (movieId: number | undefined): boolean => {
    const favoriteMovies = useAppSelector(state => state.favoriteMovies.favoriteMovies);

    for (let i = 0; i < favoriteMovies.length; i++) {
        if (movieId === favoriteMovies[i].id) {
            return true;
        }
    }

    return false;
}