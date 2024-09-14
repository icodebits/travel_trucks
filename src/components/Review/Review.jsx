import StarRating from "../../components/StarRating/StarRating";
import styles from "./Review.module.css";

function Review({ id, review }) {
  return (
    <li key={id} className={styles.rewiewItem}>
      <div className={styles.thumbNameRatingContainer}>
        <div className={styles.thumb}>
          {review.reviewer_name ? review.reviewer_name.charAt(0) : ""}
        </div>
        <div className={styles.nameRatingContainer}>
          <div className={styles.name}>{review.reviewer_name}</div>
          <div className={styles.rating}><StarRating rating={review.reviewer_rating} /></div>
        </div>
      </div>
      <div className={styles.comment}>{review.comment}</div>
    </li>
  );
}

export default Review;
