import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { IGenreResponse } from "../types/movieApiTypes";


const initialState: IGenreResponse = {
    genres: [],
};

const movieGenresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setGenres: (state: IGenreResponse, action: PayloadAction<IGenreResponse>): void => {
            state.genres = action.payload.genres;
        },
    },
});

export const { setGenres } = movieGenresSlice.actions;

export default movieGenresSlice.reducer;