import { FC, ReactElement, useEffect, useState } from "react";
import styles from './PosterGallery.module.scss';
import { useGetMovieListQuery } from "../../../store/api/movieApi";
import { IGetMovieListParam } from "../../../store/types/movieApiTypes";
import { TOP_RATED_MOVIE_ENDPOINT } from "../../../const/movieListEndpoint";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import { useAppSelector } from "../../../store/hooks/useAppSelector";
import { IMAGE_BASE_URL } from "../../../const/movieImgUrl";
import { Link } from "react-router-dom";
import { removePosters, setPosters } from "../../../store/slice/posterGallerySlice";
import { Loader } from "../../Loader";
import { DisconnectIcon } from "../../iconComponents";
import { Error } from "../../Error";


export const PosterGallery: FC = (): ReactElement => {

    const dispatch = useAppDispatch();

    const posters = useAppSelector(state => state.posters);

    const [request, setRequest] = useState<IGetMovieListParam>({
        endpoints: TOP_RATED_MOVIE_ENDPOINT,
        page: 1,
    });

    const { response, isLoading, isError } = useGetMovieListQuery(request, {
        selectFromResult: ({ data, isError, isLoading }) => ({
            response: data?.response,
            isError,
            isLoading,
        }),
    });

    useEffect(() => {
        if (response) {
            response.map(movie => {
                if (isUniq(movie.id)) {
                    dispatch(setPosters({
                        movieId: movie.id,
                        posterUrl: movie.backdrop_path,
                    }));
                }
            });
        }
    }, [response]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, []);

    function scrollHandler() {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 500) {
            if (request.page + 1 < 500) {
                setRequest(prev => ({
                    endpoints: request.endpoints,
                    page: prev.page + 1,
                }));
            }
        }
    }

    function isUniq(movieId: number): boolean {
        for (let i = 0; i < posters.length; i++) {
            if (movieId === posters[i].movieId) {
                return false;
            }
        }
        return true;
    }

    function removePosterList() {
        dispatch(removePosters());
    }

    if (isLoading) return <Loader />;
    if (isError) {
        return (
            <Error
                icon={<DisconnectIcon fill="#4d4646" height="100px" width="100px"/>}  
                title="Ошибка загрузки данных"
            />
        );
    }

    return (
        <section className={styles.sextionGallery}>
            <h2 className='sectionTitle'>
                Галерея искусства
            </h2>
            <p className={styles.gallerySubtitle}>
                Не любишь читать описание и смотреть отзывы? 
                <br />
                Просто выбери понравившийся кадр, тебе повезет)
            </p>
            <div className={styles.gallery}>
                {posters.map(poster => {
                    return (
                        <Link to={`/movie/${poster.movieId}`}
                            key={poster.movieId + Math.random()}
                            className={styles.gallery__item}
                            onClick={removePosterList}
                        >
                            <img 
                                src={IMAGE_BASE_URL + poster.posterUrl} 
                                alt='poster' 
                                
                            />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}