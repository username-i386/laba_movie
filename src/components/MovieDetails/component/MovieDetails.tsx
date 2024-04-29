import { FC, ReactElement } from "react";
import styles from './MovieDetails.module.scss';
import { IGetMovieByIdResponse, IMovie } from "../../../store/types/movieApiTypes";
import { IMAGE_BASE_URL } from "../../../const/movieImgUrl";
import { FavoriteIcon, HeartIcon } from "../../iconComponents";
import { transformDate } from "../../../utils/transformDate";
import { useIsFavoriteMovie } from "../../../hooks/useIsFavoriteMovie";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import { removeMovie, addMovie } from "../../../store/slice/favoriteMoviesSlice";

interface IMovieDetailsProps {
    movie: IGetMovieByIdResponse
}

export const MovieDetails: FC<IMovieDetailsProps> = ({movie}): ReactElement => {

    const { year, month, day } = transformDate(movie.release_date);

    const genres = movie.genres.map(genre => genre.name);

    const companies = movie.production_companies.map(company => company.name);

    let moviePosterUrl: string = movie.poster_path ? movie.poster_path : movie.backdrop_path;
    moviePosterUrl = (moviePosterUrl.split('')[0] === '/') ? moviePosterUrl.substring(1) : moviePosterUrl;


    const aboutMovieInfo = [
        { 
            infoTitle: 'Год производства:', 
            infoValue: year,
        },
        { 
            infoTitle: 'Cтрана:', 
            infoValue: movie.origin_country.join(', '),
        },
        { 
            infoTitle: 'Компании:', 
            infoValue: companies.join(', '),
        },
        { 
            infoTitle: 'Язык оригинала:', 
            infoValue: movie.original_language,
        },
        { 
            infoTitle: 'Бюджет:', 
            infoValue: movie.budget + ' $',
        },
        { 
            infoTitle: 'Сборы:', 
            infoValue: movie.revenue + ' $',
        },
        { 
            infoTitle: 'Жанры:', 
            infoValue: genres.join(', '),
        },
        { 
            infoTitle: 'Дата релиза:', 
            infoValue: day + '.' + month + '.' + year,
        },
        { 
            infoTitle: 'Длительность:', 
            infoValue: movie.runtime + ' мин.',
        },
        { 
            infoTitle: 'Статус:', 
            infoValue: movie.status,
        },
        { 
            infoTitle: 'Количество оценок:', 
            infoValue: movie.vote_count,
        },
        { 
            infoTitle: 'Средняя оценка:', 
            infoValue: movie.vote_average + ' / 10',
        },
    ];

    const dispatch = useAppDispatch();

    const isFavorite = useIsFavoriteMovie(movie.id);

    function toggleToFavorite(movieDetails: IGetMovieByIdResponse) {
        const movie: IMovie = {
            adult: movieDetails.adult,
            backdrop_path: movieDetails.backdrop_path,
            genre_ids: movieDetails.genres.map(genre => genre.id),
            id: movieDetails.id,
            original_language: movieDetails.original_language,
            original_title: movieDetails.original_title,
            overview: movieDetails.overview,
            popularity: movieDetails.popularity,
            poster_path: movieDetails.poster_path,
            release_date: movieDetails.release_date,
            title: movieDetails.title,
            video: movieDetails.video,
            vote_average: movieDetails.vote_average,
            vote_count: movieDetails.vote_count,
        };
        if (isFavorite) {
            dispatch(removeMovie(movie.id));
        } else {
            dispatch(addMovie(movie));
        }
    }

    return (
        <section>
            <section
                className={styles.movieDetails}
            >
                <div
                    className={styles.movieDetails__poster}
                >
                    <img 
                        src={IMAGE_BASE_URL + moviePosterUrl}
                        alt={movie.original_title + ' poster'}
                    />
                    <div>
                        {new Array(10).fill(undefined).map((_, index) => {
                            const fill = (Math.round(movie.vote_average) > index) ? 'orange' : 'white';
                            return (
                                <FavoriteIcon 
                                    key={index} 
                                    fill={fill} 
                                    height="24px" 
                                    width="24px" 
                                />
                            );
                        })}
                    </div>
                </div>
                <div
                    className={styles.movieDetails__about}
                >
                    <h2
                        className={styles.movieDetails__about__movieName}
                    >
                        {movie.title}
                    </h2>
                    <p
                        className={styles.movieDetails__about__movieOriginalName}
                    >
                        {movie.original_title}
                    </p>
                    <button
                        className={
                            isFavorite ?
                                [styles.movieDetails__about__addToCollection, styles.movieDetails__about__addToCollection_active].join(' ')
                                : styles.movieDetails__about__addToCollection
                        }
                        onClick={() => toggleToFavorite(movie)}
                    >
                        <HeartIcon fill="white" height="32px" width="32px" />
                        <span>
                            {isFavorite ? 'Удалить из коллекции' : 'Добавить в колекцию'}
                        </span>
                    </button>
                    <div>
                        <h3
                            className={styles.movieDetails__about__title}
                        >
                            О фильме
                        </h3>
                        <p
                            className={styles.movieDetails__about__discription}
                        >
                            {movie.overview}
                        </p>
                        <div
                            className={styles.movieDetails__about__info}
                        >
                            {aboutMovieInfo.map(movieInfo => {
                                return (
                                    <div
                                        key={movieInfo.infoTitle}
                                        className={styles.movieDetails__about__info__item}
                                    >
                                        <p>
                                            {movieInfo.infoTitle}
                                        </p>
                                        <p>
                                            {movieInfo.infoValue}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            {movie.tagline ? 
                <article
                    className={styles.slogan}
                >
                    <h2
                        className={styles.slogan__title}
                    >
                        {movie.tagline}
                    </h2>
                </article>
                : <></>    
            }
        </section>
    );
}