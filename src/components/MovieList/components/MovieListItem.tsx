import { FC, ReactElement, useEffect, useState } from "react";
import styles from './MovieListItem.module.scss';
import { IMAGE_BASE_URL } from "../../../const/movieImgUrl";
import { IMovie } from "../../../store/types/movieApiTypes";
import { FavoriteIcon, HeartIcon } from "../../iconComponents";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import { addMovie, removeMovie } from "../../../store/slice/favoriteMoviesSlice";
import { useIsFavoriteMovie } from "../../../hooks/useIsFavoriteMovie";

export interface IMovieListItemProps {
    movie: IMovie
}

export const MovieListItem: FC<IMovieListItemProps> = ({ movie }): ReactElement => {

    const dispatch = useAppDispatch();

    const [ratingColor, setRatingColor] = useState<string[]>([]);
    
    useEffect(() => {
        const colors: string[] = [];
        for (let i = 0; i < 10; i++) {
            if (Math.round(movie.vote_average) > i) {
                colors.push('orange');
            } else {
                colors.push('white');
            }
        }
        setRatingColor(colors);
    }, []);

    const isFavorite = useIsFavoriteMovie(movie.id);

    const [heartColor, setHeartColor] = useState<'white' | 'red'>(isFavorite ? 'red' : 'white');


    function toggleToFavorite() {
        if (isFavorite) {
            dispatch(removeMovie(movie.id));
            setHeartColor("white");
        } else {
            dispatch(addMovie(movie));
            setHeartColor("red");
        }
    }

    return (
        <article className={styles.movieListItem}>
            <button 
                className={styles.addToFavoriteBtn}
                onClick={toggleToFavorite}
            >
                <HeartIcon width="40px" height="40px" fill={heartColor} />
            </button>
            <div className={styles.movieListItem__poster}>
                <img src={IMAGE_BASE_URL + movie.poster_path} alt='movie poster' />
            </div>
            <div className={styles.movieListItem__content}>
                <h3 className={styles.movieListItem__title}>
                    {movie.title}
                </h3>
                <p className={styles.movieListItem__discription}>
                    {movie.overview}
                </p>
                <Link 
                    to={`/movie/${movie.id}`}
                    className={styles.movieListItem__link}
                >
                    Перейти
                </Link>
                <div className={styles.movieListItem__rating}>
                    {ratingColor.map((fill, index) => {
                        return (
                            <FavoriteIcon key={index} width="24px" height="24px" fill={fill} />
                        );
                    })}
                </div>
            </div>
        </article>
    );
}