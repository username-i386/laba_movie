import { FC, ReactElement } from "react";
import styles from './CreditsSlider.module.scss';
import { ICast, ICrew } from "../../../store/types/movieApiTypes";
import { CreditsSlider } from "./CreditsSlider";


interface ICreditsProps {
    cast: ICast[]
    crew: ICrew[]
}

export const Credits: FC<ICreditsProps> = ({ cast, crew }): ReactElement => {
    return (
        <section className={styles.credits}>
            <h2
                className='sectionTitle'
            >
                Принимали участие
            </h2>
            <CreditsSlider
                credits={cast}
            />
            <CreditsSlider
                credits={crew}
            />
        </section>
    );
}