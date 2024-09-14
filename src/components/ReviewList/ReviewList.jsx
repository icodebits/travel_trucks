import { nanoid } from "@reduxjs/toolkit";
import Review from "../../components/Review/Review";
import styles from "./ReviewList.module.css";

function ReviewList({ reviews }) {
  return (
    <ul className={styles.reviewList}>
      {reviews.map((review) => (
        <Review key={nanoid()} review={review} />
      ))}
    </ul>
  );
}

export default ReviewList;
