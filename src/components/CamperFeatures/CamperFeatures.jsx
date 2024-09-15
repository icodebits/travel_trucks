import { SVG } from "../../components/svg/svg";
import styles from "./CamperFeatures.module.css";
const CamperFeatures = ({ camper }) => {
  return (
    <>
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
              <div className={styles.featureValue}>{camper.consumption}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CamperFeatures;
