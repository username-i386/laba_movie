import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMovie }  from '../types/movieApiTypes';

const getFavoriteMovies = (): IMovie[] => {
    if (localStorage.favoriteMovies) {
        return JSON.parse(localStorage.favoriteMovies);
    }
    return [];
}

interface IFavoriteMoviesState {
    favoriteMovies: IMovie[]
}

const initialState: IFavoriteMoviesState = {
    favoriteMovies: getFavoriteMovies(),
};

const favoriteMoviesSlice = createSlice({
    name: 'favoriteMovies',
    initialState,
    reducers: {
        addMovie: (state: IFavoriteMoviesState, action: PayloadAction<IMovie>): void => {
            state.favoriteMovies.unshift(action.payload);
        },
        removeMovie: (state: IFavoriteMoviesState, action: PayloadAction<number>): void => {
            state.favoriteMovies = state.favoriteMovies.filter(movie => movie.id !== action.payload);
        },
    },
});

export const { addMovie, removeMovie } = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;