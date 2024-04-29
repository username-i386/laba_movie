import { FC, ReactElement, useState } from "react";
import styles from './NavBar.module.scss';
import { Link } from 'react-router-dom';
import { FavoriteIcon, GithubIcon, HomeIcon, TrendingIcon } from "../../iconComponents";
import { FAVORITE_URL, HOME_URL, TREND_URL } from "../../../const/navUrl";

export const NavBar: FC = (): ReactElement => {

    type activeLinkType = typeof HOME_URL | typeof TREND_URL | typeof FAVORITE_URL
    const [activeLink, setActiveLink] = useState<activeLinkType>(HOME_URL);

    const navLinks = [
        {
            url: HOME_URL,
            icon: <HomeIcon width='24px' height='24px' fill='#fff' />,
            title: 'Home',
        },
        {
            url: TREND_URL,
            icon: <TrendingIcon width='24px' height='24px' fill='#fff' />,
            title: 'Trend',
        },
        {
            url: FAVORITE_URL,
            icon: <FavoriteIcon width='24px' height='24px' fill='#fff' />,
            title: 'Favorite',
        },
    ];

    return (
        <aside className={styles.navbar}>
            <div className={styles.logo} />
            <div>
                <nav className={styles.navLinks}>
                    {navLinks.map(navLink => {
                        return (
                            <Link 
                                to={navLink.url} 
                                key={navLink.url}
                            >
                                <div 
                                    className={
                                        activeLink === navLink.url ? 
                                            [styles.navLink, styles.navLink_active].join(' ') 
                                            : styles.navLink
                                    }
                                    onClick={() => setActiveLink(navLink.url)}
                                >
                                    {navLink.icon}
                                    <span>{navLink.title}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <a href="https://github.com/username-i386" target="_blank">
                <div className={styles.navLink}>
                    <GithubIcon width='32px' height='32px' fill='#fff' />
                    <span>Github</span>
                </div>
            </a>
        </aside>
    );
}