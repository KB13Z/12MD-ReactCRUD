import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return (
      <header>
        <nav>
          <ul className={styles.menu}>
            <li>
              <Link to="/" className={styles.nav}>Home</Link>
            </li>
            <li>
              |
            </li>
            <li>
              <Link to="/diary-entries" className={styles.nav}>Diary entries</Link>
            </li>
            <li>
              |
            </li>
            <li className={styles.nav}>
              <Link to="/about" className={styles.nav}>About</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
};

export default Header;