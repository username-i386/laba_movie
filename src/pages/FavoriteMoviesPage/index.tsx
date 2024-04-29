import { FC, ReactElement } from "react";
import { FavoriteMovies } from "../../components/FavoriteMovies";


export const FavoriteMoviesPage: FC = (): ReactElement => {
    return (
        <main>
            <FavoriteMovies />
        </main>
    );
}