import { FC, ReactElement } from "react";
import styles from './FavoriteMovies.module.scss';
import { MovieGallery } from "../../MovieGallery";
import { useAppSelector } from "../../../store/hooks/useAppSelector";
import { ErrorIcon } from "../../iconComponents";
import { ErrorAlert } from "../../Error/component/Error";


export const FavoriteMovies: FC = (): ReactElement => {

    const favoriteMovies = useAppSelector(state => state.favoriteMovies.favoriteMovies);
    
    if(favoriteMovies.length === 0) {
        return (
            <ErrorAlert 
                icon={<ErrorIcon fill="#4d4646" height="100px" width="100px"/>}  
                title="Вы еще ничего не добавили"
            />
        );
    }

    return (
        <section
            className={styles.favoriteMovies}
        >
            <h2
                className='sectionTitle'
            >
                Избранное
            </h2>
            <MovieGallery movieList={favoriteMovies} />
        </section>
    );
}

