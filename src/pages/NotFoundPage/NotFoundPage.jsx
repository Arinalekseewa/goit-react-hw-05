import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFound() {
  return (
    <div className={styles['not-found-container']}>
      <div className={styles['robot']}>
        <img src="/robot.png" alt="Lost Robot" />
      </div>
      <p><em>Я зробив усе, що міг…</em></p>
      <Link to="/" className={styles['back-home-btn']}>Повернутися до пошуку 🍿</Link>
    </div>
  );
}
