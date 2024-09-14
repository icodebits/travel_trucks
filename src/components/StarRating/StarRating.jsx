import styles from "./StarRating.module.css";
const StarRating = ({ rating, totalStars = 5 }) => {
  const stars = Array.from({ length: totalStars }, (_, index) => index + 1);

  return (
    <div className={styles.starRating}>
      {stars.map((star) => (
        <span
          key={star}
          className={
            star <= rating ? `${styles.star} ${styles.filled}` : styles.star
          }
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
