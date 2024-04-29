import { FC, ReactElement, useEffect, useState } from "react";
import styles from './Carousel.module.scss';
import { IMAGE_BASE_URL } from "../../../const/movieImgUrl";
import { useGetMovieGenresQuery } from "../../../store/api/movieApi";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import { setGenres } from "../../../store/slice/movieGenresSlice";
import { IGetMovieListParam, IMovie } from "../../../store/types/movieApiTypes";
import { Link } from "react-router-dom";
import { useMovieList } from "../hooks/useMovieList";
import { NOW_PLAING_MOVIE_ENDPOINT } from "../../../const/movieListEndpoint";
import { addMovie, removeMovie } from "../../../store/slice/favoriteMoviesSlice";
import { useIsFavoriteMovie } from "../../../hooks/useIsFavoriteMovie";
import { Loader } from "../../Loader";
import { DisconnectIcon } from "../../iconComponents";
import { Error } from "../../Error";


export const Carousel: FC = (): ReactElement => {

    const movieListParams: IGetMovieListParam = {
        endpoints: NOW_PLAING_MOVIE_ENDPOINT,
        page: 1,
    }

    const dispatch = useAppDispatch();

    const { 
        data: movieGenres, 
        isLoading: isLoadingGenres, 
        isError: isErrorGenres,
    } = useGetMovieGenresQuery();

    const { 
        plaingMovieList: movieList,
        isLoading: isLoadingMovie, 
        isError: isErrorMovie,
    } = useMovieList(movieListParams);

    const [currentGenres, setCurrentGenres] = useState<string[]>([]);
    const [posterIndex, setPosterIndex] = useState<number>(0);

    useEffect(() => {
        if (movieGenres && movieList) {
            setCurrentGenres([]);
            movieList[2].genre_ids.map(genreId => {
                for (let i = 0; i < movieGenres.genres.length; i++) {
                    if (movieGenres.genres[i].id === genreId) {
                        currentGenres.push(movieGenres.genres[i].name);
                        setCurrentGenres(prev => [...prev, movieGenres.genres[i].name]);
                    }
                }
            })

            dispatch(setGenres(movieGenres));
        }
    }, [movieGenres]);

    useEffect(() => {
        setTimeout(() => {
            const nextPosterIndex = (posterIndex < 19) ? posterIndex + 1 : 0;
            setPosterIndex(nextPosterIndex);
        }, 10000);
    }, [posterIndex]);

    const isFavorite = useIsFavoriteMovie(movieList ? movieList[posterIndex].id : undefined);

    if (isLoadingGenres || isLoadingMovie) return <Loader />;
    if (isErrorMovie || isErrorGenres) {
        return (
            <Error
                icon={<DisconnectIcon fill="#4d4646" height="100px" width="100px"/>}  
                title="Ошибка загрузки данных"
            />
        );
    }
    if (!movieList) return <></>;

    function toggleMovieToFavorite(movie: IMovie) {
        if (isFavorite) {
            dispatch(removeMovie(movie.id))
        } else {
            dispatch(addMovie(movie));
        }
    }

    const movie = movieList[posterIndex];

    return (
        <div className={styles.poster}>
            <img 
                src={IMAGE_BASE_URL + movie.backdrop_path} 
                alt='poster' 
                className={styles.poster__background}
            />
            <div className={styles.poster__content}>
                <h1 className={styles.poster__title}>
                    {movie.title}
                </h1>
                <div className={styles.poster__genres}>
                    {currentGenres.map(genre => {
                        return (
                            <span key={genre}>
                                {genre}
                            </span>
                        );
                    })}
                </div>
                <p
                    className={styles.poster__subtitle}
                >
                    {movie.overview}
                </p>
                <div className={styles.poster__btns}>
                    <button
                        className={styles.poster__btns__overview}
                    >
                        <Link to={`/movie/${movie.id}`}>Перейти</Link>
                    </button>
                    <button
                        onClick={() => toggleMovieToFavorite(movie)}
                        className={styles.poster__btns__favorite}
                    >
                        {isFavorite ? 'Удалить' : 'Сохранить'}
                    </button>
                </div>
            </div>
            <p className={styles.poster__rating}>
                {movie.vote_average} / {movie.vote_count}
            </p>
            <div className={styles.poster__steps}>
                {movieList.map((movie, index) => {
                    return (
                        <div 
                            key={movie.id}
                            className={
                                (posterIndex === index) ? 
                                    [styles.poster__steps__item, styles.poster__steps__item_active].join(' ')
                                    : styles.poster__steps__item
                            }  
                        />
                    );
                })}
            </div>
        </div>
    );
}