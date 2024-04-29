import { FC, ReactElement } from "react";
import styles from './UpBtn.module.scss';
import { UpArrowIcon } from "../../iconComponents";

interface IUpBtnProps {
    upElementId: string
}

export const UpButton: FC<IUpBtnProps> = ({ upElementId }): ReactElement => {
    return (
        <a 
            href={upElementId}
            className={styles.upButton}
        >
            <UpArrowIcon fill='white' height='40px' width='40px' />
        </a>
    );
}