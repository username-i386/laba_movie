import { FC, ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCreditsByIdQuery, useGetMovieByIdQuery, useGetSimilarMoviesByIdQuery, useGetVideosByIdQuery } from "../../store/api/movieApi";
import { MovieDetails } from "../../components/MovieDetails";
import { IGetMovieByQueryParam } from "../../store/types/movieApiTypes";
import { Pagination } from "../../components/Pagination";
import { MovieGallery } from "../../components/MovieGallery";
import { Clips } from "../../components/Clips";
import { Credits } from "../../components/Credits";
import { Loader } from "../../components/Loader";
import { DisconnectIcon } from "../../components/iconComponents";
import { Error } from "../../components/Error";


export const MoviePage: FC = (): ReactElement => {

    const { movieId = '' } = useParams();

    const { data: movie, isError, isLoading } = useGetMovieByIdQuery(movieId);

    const [request, setRequest] = useState<IGetMovieByQueryParam>({
        page: '1',
        query: movieId,
    });

    useEffect(() => {
        setRequest({
            page: '1',
            query: movieId,
        })
    }, [movieId]);

    const { data, isLoading: isLoadingSimilar, isError: isErrorSimilar } = useGetSimilarMoviesByIdQuery(request);

    const { data: videos, isLoading: isLoadingVideos, isError: isErrorVideos } = useGetVideosByIdQuery(movieId);

    const { data: credits, isLoading: isLoadingCredits, isError: isErrorCreadits } = useGetCreditsByIdQuery(movieId);


    if (isLoading || isLoadingSimilar || isLoadingVideos || isLoadingCredits) return <Loader />;
    if (isError || isErrorSimilar || isErrorVideos || isErrorCreadits) {
        return (
            <Error
                icon={<DisconnectIcon fill="#4d4646" height="100px" width="100px"/>}  
                title="Ошибка загрузки данных"
            />
        );
    }
    if(!movie || !data || !videos || !credits) return <></>


    return (
        <main>
            <MovieDetails movie={movie} /> 
            <div>
                <Credits
                    cast={credits.cast}
                    crew={credits.crew}
                />
            </div>
            <div>
                <h2
                    className='sectionTitle'
                >
                    Клипы
                </h2>
                <Clips videos={videos.videos} />
            </div>
            <section id='similarMovies'>
                <h2
                    className='sectionTitle'
                >
                    Вам может понравится
                </h2>
                <Pagination 
                    bind={{
                        linkedElementId: '#similarMovies',
                        position: 'up',
                    }}
                    setRequest={setRequest}
                    currentPage={+request.page}
                    totalPages={data.total_pages}
                />
                <MovieGallery 
                    movieList={data.results}
                />
                <Pagination 
                    bind={{
                        linkedElementId: '#similarMovies',
                        position: 'down',
                    }}
                    setRequest={setRequest}
                    currentPage={+request.page}
                    totalPages={data.total_pages}
                />
            </section>
        </main>
    );
}