import { FC, ReactElement } from "react";
import { Carousel } from "../../components/Carousel";
import { MovieList } from "../../components/MovieList";
import { MovieGenres } from "../../components/MovieGenres";
import { PosterGallery } from "../../components/PosterGallery";
import { UpButton } from "../../components/UpBtn";
import { SearchBar } from "../../components/SearchBar";


export const HomePage: FC = (): ReactElement => {
    return (
        <main id='main'>
            <Carousel /> 
            <SearchBar />
            <MovieList 
                title='TОП 10 фильмов'
            /> 
            <MovieGenres />
            <PosterGallery />
            <UpButton upElementId='#main' /> 
        </main>
    );
}