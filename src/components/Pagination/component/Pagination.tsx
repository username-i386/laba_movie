import { Dispatch, FC, ReactElement, SetStateAction, useEffect, useState } from "react";
import styles from './Pagination.module.scss';
import { BackArrowIcon, DoubleBackArrowIcon, DoubleNextArrow, NextArrow } from "../../iconComponents";
import { IGetMovieByQueryParam, IGetMovieListParam } from "../../../store/types/movieApiTypes";

interface IPaginationProps {
    bind: {
        position: 'up' | 'down'
        linkedElementId: string
    }
    totalPages: number
    currentPage: number
    setRequest: Dispatch<SetStateAction<IGetMovieByQueryParam>> | Dispatch<SetStateAction<IGetMovieListParam>>
}

export const Pagination: FC<IPaginationProps> = (props): ReactElement => {

    const { setRequest, totalPages, bind, currentPage } = props;

    const [page, setPages] = useState<number[]>([]);

    useEffect(() => {
        const pagesCount: number[] = [];

        const paginationLength: number = (window.innerWidth < 380) ? 1 
            : (window.innerWidth < 830) ? 2 
            : 5;
        
        for (let i = currentPage - paginationLength; i <= totalPages; i++) {
            if (pagesCount.length >= paginationLength * 2 + 1) {
                break;
            }
            if (i > 0 && i <= 500) {
                pagesCount.push(i);
            }
        }

        setPages(pagesCount);
    }, [currentPage]);


    function moveToFirstPage() {
        if (currentPage > 1) {
            setRequest((prev: any) => ({
                ...prev,
                page: '1',
            }));
        }
    }

    function moveToPrevPage() {
        if (currentPage > 1) {
            setRequest((prev: any) => ({
                ...prev,
                page: String(currentPage - 1),
            }));
        }
    }

    function moveToNextPage() {
        if (currentPage < 500) {
            setRequest((prev: any) => ({
                ...prev,
                page: String(currentPage + 1),
            }));
        }
    }

    function moveToLastPage() {
        const lastPage: number = Math.min(500, totalPages);
        if (currentPage < lastPage) {
            setRequest((prev: any) => ({
                ...prev,
                page: String(lastPage),
            }));
        }
    }

    function moveToChoosePage(choosePage: number) {
        if (currentPage !== choosePage) {
            setRequest((prev: any) => ({
                ...prev,
                page: String(choosePage),
            }));
        }
    }

    return (
        <div className={styles.pagination}>
            <button 
                className={styles.pagination__navBtn}
                onClick={moveToFirstPage}
            >
                <DoubleBackArrowIcon width='24px' height='24px' fill="white" />
            </button>
            <button 
                className={styles.pagination__navBtn}
                onClick={moveToPrevPage}
            >
                <BackArrowIcon width='24px' height='24px' fill="white" />
            </button>
            <div className={styles.pagination__numbers}>
                {page.map(page => {
                    return (
                        <div 
                            key={page}
                            className={
                                (page === currentPage) ?
                                    [styles.pagination__numbers__item, styles.pagination__numbers__item_active].join(' ') 
                                    : styles.pagination__numbers__item
                            }
                            onClick={() => moveToChoosePage(page)}
                        >
                            {(bind.position === 'down') ?
                                <a href={bind.linkedElementId}>
                                    {page}
                                </a>
                                : <p>{page}</p>
                            }
                        </div>
                    );
                })}
            </div>
            <button 
                className={styles.pagination__navBtn}
                onClick={moveToNextPage}
            >
                <NextArrow width='24px' height='24px' fill="white" />
            </button>
            <button 
                className={styles.pagination__navBtn}
                onClick={moveToLastPage}
            >
                <DoubleNextArrow width='24px' height='24px' fill="white" />
            </button>
        </div>
    );
}