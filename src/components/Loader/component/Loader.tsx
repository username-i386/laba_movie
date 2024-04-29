import { FC, ReactElement } from "react";
import styles from './Loader.module.scss';


export const Loader: FC = (): ReactElement => {
    return (
        <div
            className={styles.loaderContainer}
        >
            <span className={styles.loader}></span>
        </div>
    );
}