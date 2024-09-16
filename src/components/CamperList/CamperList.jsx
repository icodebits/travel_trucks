import { useSelector, useDispatch } from "react-redux";
import CamperItem from "../../components/CamperItem/CamperItem";
import styles from "./CamperList.module.css";
import Loader from "../../components/Loader/Loader";
import { loadMoreCampers } from "../../redux/campersSlice";

const CamperList = ({ campers, hasMore }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.campers.status);

  // Handle "Load More" button click
  const handleLoadMore = () => {
    dispatch(loadMoreCampers());
  };

  return (
    <div className={styles.campersListContainer}>
      {status === "loading" && <Loader />}
      {status === "succeeded" && !campers && (
        <p className={styles.noCampersFound}>No campers found</p>
      )}

      {status === "failed" && (
        <p className={styles.noCampersFound}>Error loading campers</p>
      )}

      {status === "succeeded" &&
        campers &&
        campers.map((camper) => (
          <CamperItem key={camper.id} camper={camper} />
        ))}

      {status === "succeeded" && hasMore && (
        <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CamperList;
