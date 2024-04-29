import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./api/movieApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import movieGenresReducer from "./slice/movieGenresSlice";
import posterGalleryReducer from "./slice/posterGallerySlice";
import favoriteMoviesReducer from "./slice/favoriteMoviesSlice";


const rootReducer = combineReducers({
    [movieApi.reducerPath]: movieApi.reducer,
    genres: movieGenresReducer,
    posters: posterGalleryReducer,
    favoriteMovies: favoriteMoviesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;