import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
function HomePage() {

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <h2 className={styles.text}>
            You can find everything you want in our catalog
          </h2>
        </div>
        <Link to={`/catalog`} className={styles.ctaButton}>
          View Now
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
