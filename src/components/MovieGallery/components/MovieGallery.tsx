import { FC, ReactElement } from "react";
import styles from './MovieGallery.module.scss';
import { IMovie } from "../../../store/types/movieApiTypes";
import { MovieGalleryItem } from "./MovieGalleryItem";

interface IMovieGalleryProps {
    movieList: IMovie[]
}

export const MovieGallery: FC<IMovieGalleryProps> = ({ movieList }): ReactElement => {
    return (
        <section>
            <ul className={styles.movieGallery}>
                {movieList.map(movie => {
                    return (
                        <MovieGalleryItem key={movie.id} movie={movie} />
                    );
                })}
            </ul>
        </section>
    );
}