import { createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import { FAVORITE_URL, HOME_URL, MOVIE_URL, TREND_URL } from "./const/navUrl";
import { HomePage } from "./pages/HomePage";
import { MoviePage } from "./pages/MoviePage";
import { FavoriteMoviesPage } from "./pages/FavoriteMoviesPage";
import { TrendPage } from "./pages/TrendPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: HOME_URL,
                element: <HomePage />,
            },
            {
                path: TREND_URL,
                element: <TrendPage />,
            },
            {
                path: FAVORITE_URL,
                element: <FavoriteMoviesPage />,
            },
            {
                path: MOVIE_URL,
                element: <MoviePage />,
            },
        ],
    }
]);