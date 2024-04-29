import { FC, ReactElement } from "react"
import styles from './Clips.module.scss';
import { ITransformVideo } from "../../../store/types/movieApiTypes";


interface IClipProps {
    videos: ITransformVideo[]
}

export const Clips: FC<IClipProps> = ({ videos }): ReactElement => {

    if (!videos) return <></>

    return (
        <section
            className={styles.clips}
        >
            {videos.map((video, index) => {
                if (index < 4) {
                    return (
                        <iframe 
                            key={video.videoId}
                            className={styles.clips__item} 
                            src={`https://www.youtube.com/embed/${video.videoId}`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                        >
                        </iframe>
                    );
                } 
            })}
            
        </section>
    );
}