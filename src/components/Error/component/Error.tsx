import { FC, ReactElement } from "react";
import styles from './Error.module.scss';


interface IErrorAlertProps {
    icon: ReactElement
    title: string
}

export const Error: FC<IErrorAlertProps> = ({ icon, title }): ReactElement => {
    return (
        <div
            className={styles.errorAlert}
        >
            {icon}
            <h2>
                {title}
            </h2>
        </div>
    );
}