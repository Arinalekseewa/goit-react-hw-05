import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <header className={styles['nav']}>
      <nav className={styles['nav-list']}>
        <NavLink to="/" className={styles.link}>
          Netflix хто?
        </NavLink>
        <NavLink to="/movies" className={styles.link}>
          🎥Кіно-лабіринт🎥
        </NavLink>
      </nav>
    </header>
  );
};