import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCamperById } from "../../redux/campersSlice";
import Loader from "../../components/Loader/Loader";
import styles from "./CamperDetailPage.module.css";
import { SVGSource, SVG } from "../../components/svg/svg";

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
    const fetch = async () => {
      dispatch(fetchCamperById(id));
    };
    fetch();
  }, [dispatch, id]);

  return (
    <>
      {status === "loading" && <Loader />}
      {status === "succeeded" && camper && camper.reviews && (
        <div className={styles.container}>
          <div className={styles.title}>
            <h2 className={styles.name}>{camper.name}</h2>
            {/*<div className={styles.camperTitle}>
                <h2 className={styles.camperName}>{camper.name}</h2>
                <div className={styles.camperPriceContainer}>
                  <p className={styles.camperPrice}>
                    €
                    {camper.price.toLocaleString("en", {
                      useGrouping: false,
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>*/}
            <div className={styles.camperRatingLocationPriceContainer}>
              <div className={styles.camperRatingLocationContainer}>
                <div className={styles.camperRatingContainer}>
                  <SVG id="rating-star" width={20} height={20} />
                  {camper.rating}({camper.reviews.length} Reviews)
                </div>
                <div className={styles.camperLocationContainer}>
                  <SVG id="map" width={16} height={16} />
                  {camper.location}
                </div>
              </div>
              <h2 className={styles.camperPrice}>
                €
                {camper.price.toLocaleString("en", {
                  useGrouping: false,
                  minimumFractionDigits: 2,
                })}
              </h2>
            </div>
          </div>
          <div className={styles.imageGallery}>
            {camper.gallery.map((image, index) => (
              <img key={index} src={image.thumb} alt={`Camper ${index + 1}`} />
            ))}
          </div>
          <div className={styles.description}>
            <p>{camper.description}</p>
          </div>
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
          {activeTab === "features" && (
            <div className={styles.details}>
              <div className={styles.camperInfo}>
                {camper.transmission && (
                  <span className={styles.camperInfoItem}>
                    <SVG id="diagram" width={20} height={20} />
                    {camper.transmission}
                  </span>
                )}
                {camper.engine && (
                  <span className={styles.camperInfoItem}>
                    <SVG id="fuel-pump" width={20} height={20} />
                    {camper.engine}
                  </span>
                )}
                {camper.AC && (
                  <span className={styles.camperInfoItem}>
                    <SVG id="wind" width={20} height={20} />
                    AC
                  </span>
                )}
                {camper.bathroom && (
                  <span className={styles.camperInfoItem}>
                    <SVG id="toilet" width={20} height={20} />
                    Bathroom
                  </span>
                )}
                {camper.kitchen && (
                  <span className={styles.camperInfoItem}>
                    <SVG id="cup-hot" width={20} height={20} />
                    Kitchen
                  </span>
                )}
                {camper.TV && (
                  <span className={styles.camperInfoItem}>
                    <SVG id="tv" width={20} height={20} />
                    TV
                  </span>
                )}
                {camper.radio && (
                  <span className={styles.camperInfoItem}>
                    <SVG id="radio" width={20} height={20} />
                    Radio
                  </span>
                )}
                {camper.refrigerator && (
                  <span className={styles.camperInfoItem}>
                    <SVG id="fridge" width={20} height={20} />
                    Refrigerator
                  </span>
                )}
                {camper.microwave && (
                  <span className={styles.camperInfoItem}>
                    <SVG id="microwave" width={20} height={20} />
                    Microwave
                  </span>
                )}
                {camper.gas && (
                  <span className={styles.camperInfoItem}>
                    <SVG id="gas" width={20} height={20} />
                    Gas
                  </span>
                )}
                {camper.water && (
                  <span className={styles.camperInfoItem}>
                    <SVG id="bi-droplet" width={20} height={20} />
                    Water
                  </span>
                )}
              </div>
              <div className={styles.features}>
                <h3 className={styles.featuresTitle}>Vehicle details</h3>
                <div className={styles.featuresList}>
                  <div className={styles.featuresListItem}>
                    <div className={styles.featureName}>Form</div>
                    <div className={styles.featureValue}>
                      {camper.form === "fullyIntegrated"
                        ? "Fully Integrated"
                        : camper.form === "panelTruck"
                        ? "Panel Truck"
                        : camper.form}
                    </div>
                  </div>
                  <div className={styles.featuresListItem}>
                    <div className={styles.featureName}>Length</div>
                    <div className={styles.featureValue}>{camper.length}</div>
                  </div>
                  <div className={styles.featuresListItem}>
                    <div className={styles.featureName}>Width</div>
                    <div className={styles.featureValue}>{camper.width}</div>
                  </div>
                  <div className={styles.featuresListItem}>
                    <div className={styles.featureName}>Height</div>
                    <div className={styles.featureValue}>{camper.height}</div>
                  </div>
                  <div className={styles.featuresListItem}>
                    <div className={styles.featureName}>Tank</div>
                    <div className={styles.featureValue}>{camper.tank}</div>
                  </div>
                  <div className={styles.featuresListItem}>
                    <div className={styles.featureName}>Consumption</div>
                    <div className={styles.featureValue}>
                      {camper.consumption}
                    </div>
                  </div>
                </div>
              </div>
            </div> /* details */
          )}

          {activeTab === "reviews" && (
            <div className="reviews-content">
              <h2>Customer Reviews</h2>
              <p>⭐⭐⭐⭐⭐ - Great experience with this vehicle!</p>
            </div>
          )}
        </div> /* container */
      )}
      <SVGSource />
    </>
  );
}

export default CamperDetailPage;
