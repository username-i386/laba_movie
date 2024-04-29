import { FC, ReactElement, useEffect } from 'react';
import styles from './App.module.scss';
import { NavBar } from '../../NavBar';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks/useAppSelector';

export const App: FC = (): ReactElement => {

  const favoriteMovies = useAppSelector(state => state.favoriteMovies.favoriteMovies);

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);
  

  return (
    <>
      <div className={styles.mainContainer}>
        <div>
          <NavBar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  )
}

