import { FC, ReactElement } from "react";
import styles from './MovieList.module.scss';
import { IGetMovieListParam } from "../../../store/types/movieApiTypes";
import { MovieListItem } from "./MovieListItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TOP_RATED_MOVIE_ENDPOINT } from "../../../const/movieListEndpoint";
import { useTop10MovieList } from "../hooks/useTop10MovieList";
import { Loader } from "../../Loader";
import { ErrorAlert } from "../../Error/component/Error";
import { DisconnectIcon } from "../../iconComponents";


interface IMovieListProps {
    title: string
}

export const MovieList: FC<IMovieListProps> = ({ title }): ReactElement => {

    const topRatedMovieListParams: IGetMovieListParam = {
        endpoints: TOP_RATED_MOVIE_ENDPOINT,
        page: 1,
    }

    const {topRatedMovieList, isError, isLoading} = useTop10MovieList(topRatedMovieListParams);

    if (isLoading) return <Loader />;
    if (isError) {
        return (
            <ErrorAlert 
                icon={<DisconnectIcon fill="#4d4646" height="100px" width="100px"/>}  
                title="Ошибка загрузки данных"
            />
        );
    }
    if (!topRatedMovieList) return <></>;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        // variableWidth: true,
        // scrswipeToSlide: true,
        responsive: [
            {
                breakpoint: 1450,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    // variableWidth: false,
                    // scrswipeToSlide: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
    };

    return (
        <section
            className={styles.carouselContainer}
        >
            <h2 className='sectionTitle'>
                {title}
            </h2>
            <div className={styles.carousel}>
                <div>
                    <Slider {...settings}>
                        {topRatedMovieList.map(movie => {
                                return (
                                    <div
                                        key={movie?.id}
                                    >
                                        <MovieListItem movie={movie!} />
                                    </div>
                                );
                        })}
                    </Slider>
                </div>
            </div>
        </section>
    );
}
