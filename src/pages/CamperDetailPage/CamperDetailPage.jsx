import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCamperById } from "../../api/campers";
import Loader from "../../components/Loader/Loader";
import styles from "./CamperDetailPage.module.css";
import { SVGSource } from "../../components/svg/svg";
import ReviewList from "../../components/ReviewList/ReviewList";
import BookingForm from "../../components/BookingForm/BookingForm";
import CamperFeatures from "../../components/CamperFeatures/CamperFeatures";
import CamperDetails from "../../components/CamperDetails/CamperDetails";

function CamperDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector((state) => state.campers.list);
  const status = useSelector((state) => state.campers.status);
  const [activeTab, setActiveTab] = useState("features");

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update the active tab
  };

  // Fetch camper data based on the ID from the URL
  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  return (
    <>
      {status === "loading" && <Loader />}
      {status === "succeeded" &&
        camper &&
        camper.reviews && (
          <div className={styles.container}>
            <CamperDetails camper={camper} />
            {/* tabs */}
            <div className={styles.tabs}>
              <div
                className={
                  activeTab === "features"
                    ? `${styles.tab} ${styles.active}`
                    : styles.tab
                }
                onClick={() => handleTabClick("features")}
              >
                Features
              </div>
              <div
                className={
                  activeTab === "reviews"
                    ? `${styles.tab} ${styles.active}`
                    : styles.tab
                }
                onClick={() => handleTabClick("reviews")}
              >
                Reviews
              </div>
            </div>
            <div className={styles.featuresFormContainer}>
              {activeTab === "features" && camper && (
                <CamperFeatures camper={camper} />
              )}

              {activeTab === "reviews" && camper.reviews && (
                <ReviewList reviews={camper.reviews} />
              )}

              <BookingForm />
            </div>
          </div> /* container */
        )}
      <SVGSource />
    </>
  );
}

export default CamperDetailPage;
