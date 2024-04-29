import { FC, ReactElement, useState } from "react";
import { useGetMovieListQuery } from "../../../store/api/movieApi";
import { POPULAR_MOVIE_ENDPOINT } from "../../../const/movieListEndpoint";
import { IGetMovieListParam } from "../../../store/types/movieApiTypes";
import { MovieGallery } from "../../MovieGallery";
import { Pagination } from "../../Pagination";
import { Loader } from "../../Loader";
import { Error } from "../../Error";
import { DisconnectIcon } from "../../iconComponents";


export const Trend: FC = (): ReactElement => {
    
    const [requet, setRequest] = useState<IGetMovieListParam>({
        endpoints: POPULAR_MOVIE_ENDPOINT,
        page: 1,
    });

    const { data, isError, isLoading } = useGetMovieListQuery(requet);


    if (isLoading) return <Loader />;
    if (isError) {
        return (
            <Error
                icon={<DisconnectIcon fill="#4d4646" height="100px" width="100px"/>}  
                title="Ошибка загрузки данных"
            />
        );
    }
    if (!data) return <h1>ERROR</h1>;


    return (
        <section
            id='trendSection'
        >
            <h2
                className='sectionTitle'
            >
                Сейчас в тренде
            </h2>
            <Pagination 
                bind={{
                    linkedElementId: '#trendSection',
                    position: 'up',
                }}
                currentPage={requet.page}
                setRequest={setRequest}
                totalPages={data.totalPages}
            />
            <MovieGallery movieList={data.response} />
            <Pagination 
                bind={{
                    linkedElementId: '#trendSection',
                    position: 'down',
                }}
                currentPage={requet.page}
                setRequest={setRequest}
                totalPages={data.totalPages}
            />
        </section>
    );
}