import styles from "./CamperDetails.module.css";
import { SVG } from "../../components/svg/svg";

const CamperDetails = ({ camper }) => {
    return (
      <>
        <div className={styles.title}>
          <h2 className={styles.name}>{camper.name}</h2>
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
      </>
    );
};

export default CamperDetails;