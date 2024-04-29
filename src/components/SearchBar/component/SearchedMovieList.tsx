import { FC, ReactElement } from "react";
import styles from './SearchedMovieList.module.scss';
import { transformDate } from "../../../utils/transformDate";
import { IMAGE_BASE_URL } from "../../../const/movieImgUrl";
import { IMovie } from "../../../store/types/movieApiTypes";
import { Link } from "react-router-dom";

interface ISearchedMovieListProps {
    movieList: IMovie[]
}

export const SearchedMovieList: FC<ISearchedMovieListProps> = ({ movieList }): ReactElement => {
    return (
        <ul className={styles.searchedMovieList}>
                {
                    movieList.map(movie => {
                        const { year } = transformDate(movie.release_date);
                        return (
                            <li
                                key={movie.id}
                            >
                                <Link to={`/movie/${movie.id}`} 
                                    className={styles.searchedMovieList__item}
                                >
                                    <img 
                                        src={IMAGE_BASE_URL + movie.poster_path} 
                                        alt='poster'
                                        className={styles.searchedMovieList__item__poster}
                                    />
                                    <div
                                        className={styles.searchedMovieList__item__text}
                                    >
                                        <h3
                                            className={styles.searchedMovieList__item__title}
                                        >
                                            <span>
                                                {movie.title}
                                            </span>
                                            <span
                                                className={styles.searchedMovieList__item__date}
                                            >
                                                ({year})
                                            </span>
                                        </h3>
                                        <p className={styles.searchedMovieList__item__subtitle}
                                        >
                                            {movie.overview}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        );
                })
                }
            </ul>
    );
}