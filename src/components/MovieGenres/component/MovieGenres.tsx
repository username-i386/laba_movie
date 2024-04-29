import { FC, ReactElement, useState } from "react";
import styles from './MovieGenres.module.scss';
import { useAppSelector } from "../../../store/hooks/useAppSelector";
import { useGetMovieListByGenreQuery } from "../../../store/api/movieApi";
import { MovieGallery } from "../../MovieGallery";
import { Pagination } from "../../Pagination";
import { IGetMovieByQueryParam } from "../../../store/types/movieApiTypes";
import { Loader } from "../../Loader";
import { DisconnectIcon } from "../../iconComponents";
import { Error } from "../../Error";


export const MovieGenres: FC = (): ReactElement => {

    const movieGenres = useAppSelector(state => state.genres.genres);

    const [request, setRequest] = useState<IGetMovieByQueryParam>({
        query: '28',
        page: '1',
    });

    const { response, isLoading, isError } = useGetMovieListByGenreQuery(request, {
        selectFromResult: ({ data, isLoading, isError }) => ({
            response: data,
            isError,
            isLoading,
        }),
    });

    function changeMovieGenre(event: React.ChangeEvent<HTMLSelectElement>) {
        const genreId = event.target.value;
        setRequest({ 
            query: genreId, 
            page: '1' 
        });
    }
    
    return (
        <section>
            <h2 className='sectionTitle'>
                Подборки по жанру
            </h2>
            <div className={styles.genresListContainer}>
                <h2>Хотите посмотреть жанр</h2>
                <select 
                    className={styles.genresList}
                    onChange={e => changeMovieGenre(e)}
                >
                    {movieGenres.map(genre => {
                        return (
                            <option
                                key={genre.id}
                                value={genre.id}
                            >
                                {genre.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            {
                isLoading ? <Loader />
                    : isError ?  <Error
                        icon={<DisconnectIcon fill="#4d4646" height="100px" width="100px"/>}  
                        title="Ошибка загрузки данных"
                    />
                    : (!response) ? <h1>ERROR</h1>
                    : <div id='movieGallery'>
                        <Pagination 
                            totalPages={response.total_pages}
                            setRequest={setRequest}
                            currentPage={+request.page}
                            bind={{
                                linkedElementId: '#movieGallery',
                                position: "up",
                            }}
                        />
                        <MovieGallery 
                            movieList={response.results} 
                        />
                        <Pagination 
                            totalPages={response.total_pages}
                            setRequest={setRequest}
                            currentPage={+request.page}
                            bind={{
                                linkedElementId: '#movieGallery',
                                position: "down",
                            }}
                        />
                    </div>
            }
        </section>
    );
}