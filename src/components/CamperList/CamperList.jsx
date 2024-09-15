import { useSelector } from "react-redux";
import CamperItem from "../../components/CamperItem/CamperItem";
import styles from "./CamperList.module.css";
import Loader from "../../components/Loader/Loader";

const CamperList = ({ campers, filteredCampers, loadMore }) => {
  const status = useSelector((state) => state.campers.status);

  return (
    <>
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

        {status === "succeeded" && campers.length < filteredCampers.length && (
          <button onClick={loadMore} className={styles.loadMoreBtn}>
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default CamperList;
