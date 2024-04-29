import { FC, ReactElement } from "react";
import styles from './MovieGalleryItem.module.scss';
import { IMovie } from "../../../store/types/movieApiTypes";
import { IMAGE_BASE_URL } from "../../../const/movieImgUrl";
import { EyeIcon, FavoriteIcon, HeartIcon, TrendingIcon } from "../../iconComponents";
import { transformDate } from "../../../utils/transformDate";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import { removeMovie, addMovie } from "../../../store/slice/favoriteMoviesSlice";
import { useIsFavoriteMovie } from "../../../hooks/useIsFavoriteMovie";

interface IMovieGalleryItemProps {
    movie: IMovie
}

export const MovieGalleryItem: FC<IMovieGalleryItemProps> = ({ movie }): ReactElement => {

    const dispatch = useAppDispatch();

    const isFavorite = useIsFavoriteMovie(movie.id);
    
    const { day, month, year } = transformDate(movie.release_date);

    function toggleToFavorite(movie: IMovie, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        if (isFavorite) {
            dispatch(removeMovie(movie.id));
        } else {
            dispatch(addMovie(movie));
        }
    }



    return (
        <li className={styles.movieCard}>
            <Link to={`/movie/${movie.id}`}
                className={styles.movieCard__link}
            >
                <img 
                    src={IMAGE_BASE_URL + movie.poster_path} 
                    alt={movie.original_title} 
                    className={styles.movieCard__poster}
                />
                <p>
                    {'Релиз: ' + day + '.' + month + '.' + year}
                </p>
                <p className={styles.movieCard__discription}>
                    {movie.overview}
                </p>
                <footer>
                    <button
                        className={
                            isFavorite ?
                                [styles.movieCard__favoriteBtn, styles.movieCard__favoriteBtn_active].join(' ')
                                : styles.movieCard__favoriteBtn
                        }
                        onClick={(e) => toggleToFavorite(movie, e)}
                    >
                        <HeartIcon fill={'white'} height="32px" width="32px" />
                        <p>
                            {isFavorite ? 'Удалить' : 'Сохранить'}
                        </p>
                    </button>
                    <div className={styles.movieCard__atributes}>
                        <div className={styles.movieCard__atribute}>
                            <EyeIcon fill="#fff" height="24px" width="24px" />
                            <p>
                                {movie.vote_count}
                            </p>
                        </div>
                        <div className={styles.movieCard__atribute}>
                            <FavoriteIcon fill="#fff" height="24px" width="24px" />
                            <p>
                                {movie.vote_average}
                            </p>
                        </div>
                        <div className={styles.movieCard__atribute}>
                            <TrendingIcon fill="#fff" height="24px" width="24px" />
                            <p>
                                {movie.popularity}
                            </p>
                        </div>
                        
                    </div>
                </footer>
            </Link>
        </li>
    );
}