import { FC, ReactElement } from "react";
import styles from './CreditsSlider.module.scss';
import Slider from "react-slick";
import { ICast, ICrew } from "../../../store/types/movieApiTypes";
import { IMAGE_BASE_URL } from "../../../const/movieImgUrl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ICreditsSliderProps {
    credits: ICast[] | ICrew[]
}

export const CreditsSlider: FC<ICreditsSliderProps> = ({ credits }): ReactElement => {

    const settings = {
        className: "slider variable-width",
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        swipeToSlide: true,
        variableWidth: true,    
    };

    return (
        <div className={styles.slider}>
            <div>
                <Slider {...settings}>
                    {credits.map(actor => {
                        return (
                            <Slide {...actor} key={actor.credit_id} />
                        )
                    })}
                </Slider>
            </div>
        </div>
    );
}

const Slide: FC<ICast | ICrew> = (actor): ReactElement => {

    if (!actor.profile_path || !actor.known_for_department || !actor.original_name) return <></>;

    return (
        <article
            className={styles.slide}
        >
            <img 
                src={IMAGE_BASE_URL + actor.profile_path} 
                alt={actor.original_name}
                className={styles.slide__avatar}
            />
            <h3
                className={styles.slide__job}
            >
                {actor.known_for_department}
            </h3>
            <h3
                className={styles.slide__name}
            >
                {actor.original_name}
            </h3>
        </article>
    );
    
}