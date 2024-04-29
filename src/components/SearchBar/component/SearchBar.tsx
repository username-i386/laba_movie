import { FC, ReactElement, useEffect, useState } from "react";
import styles from './SearchBar.module.scss';
import { CrossIcon, SearchIcon } from "../../iconComponents";
import { IGetMovieByQueryParam } from "../../../store/types/movieApiTypes";
import { useGetMovieListByTitleQuery } from "../../../store/api/movieApi";
import { SearchedMovieList } from "./SearchedMovieList";


export const SearchBar: FC = (): ReactElement => {

    const [placeholder, setPlaceholder] = useState<string>('Введите название фильма...');
    const [requestTitle, setRequestTitle] = useState<string>('');
    const [skip, setSkip] = useState<boolean>(true);
    const [request, setRequest] = useState<IGetMovieByQueryParam>({
        page: '1',
        query: requestTitle,
    });

    const { response, isLoading, isError } = useGetMovieListByTitleQuery(request, {
        skip,
        selectFromResult: ({ data, isLoading, isError }) => ({
            response: data?.response,
            isError,
            isLoading,
        }),
    });

    useEffect(() => {
        function escapeListener(event: KeyboardEvent) {
            if (event.code === 'Escape') {
                closeSearchedMovie();
            }
        }
        document.addEventListener('keydown', escapeListener);
        return () => {
            document.removeEventListener('keydown', escapeListener);
        }
    }, []);

    function searchMovie() {
        if (requestTitle.trim() !== '') {
            setRequest({
                page: request.page,
                query: requestTitle,
            });
            setSkip(false);
            setPlaceholder('Для закрытия нажмите на крестик или Escape...');
            setRequestTitle('');
        }
    }

    function closeSearchedMovie() {
        setSkip(true);
        setRequestTitle('');
        setPlaceholder('Введите название фильма...');
    }

    return (
        <section className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
                <input 
                    className={styles.searchBar__input}
                    placeholder={placeholder}
                    value={requestTitle}
                    onChange={e => setRequestTitle(e.target.value)}
                    onKeyDown={e => {
                        if (e.code === 'Enter') {
                            searchMovie();
                        }
                    }}
                />
                {
                    skip ? 
                        <button 
                            className={styles.searchBar__btn}
                            onClick={searchMovie}
                        >
                            <SearchIcon fill="#ffffff" height="24px" width="24px" />
                        </button>
                        : <button
                            className={[styles.searchBar__btn, styles.searchBar__btn_close].join(' ')}
                            onClick={closeSearchedMovie}
                        >
                            <CrossIcon fill="#ffffff" height="24px" width="24px" />
                        </button> 
                }
            </div>
            {
                isLoading ? <h1>LOADING</h1>
                : isError ? <h1>ERROR</h1>
                : skip ? <></>
                : (!response) ? <></>
                : <SearchedMovieList movieList={response} />
            }
        </section>
    );
}