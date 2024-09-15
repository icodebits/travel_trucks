import { Link } from "react-router-dom";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CamperItem.module.css";
import { SVG } from "../../components/svg/svg";

const CamperItem = ({ camper }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.list);
    
    // Handle favorites
    const getIsFavorite = (id) => {
        return favorites.includes(id);
    };

    const handleFavoriteClick = (id) => {
        if (getIsFavorite(id)) {
        dispatch(removeFromFavorites(id));
        } else {
        dispatch(addToFavorites(id));
        }
    };
    
    return (
        <>
        <div key={camper.id} className={styles.camperCard}>
            <img src={camper.gallery[0].thumb} alt={camper.name} />
            <div className={styles.camperDetails}>
            <div className={styles.camperTitleLocationContainer}>
                <div className={styles.camperTitle}>
                <h2 className={styles.camperName}>{camper.name}</h2>
                <div className={styles.camperPriceContainer}>
                    <p className={styles.camperPrice}>
                    €
                    {camper.price.toLocaleString("en", {
                        useGrouping: false,
                        minimumFractionDigits: 2,
                    })}
                    </p>
                    <button
                    key={camper.id}
                    onClick={() => handleFavoriteClick(camper.id)}
                    className={styles.favoriteButton}
                    >
                    <SVG
                        id="favorite"
                        width={24}
                        height={24}
                        className={
                        getIsFavorite(camper.id)
                            ? styles.camperFavoriteAdded
                            : styles.camperFavorite
                        }
                    />
                    </button>
                </div>
                </div>
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
            </div>

            <div className={styles.camperDescription}>{camper.description}</div>

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
                {camper.form && (
                <span className={styles.camperInfoItem}>
                    <SVG id="bi-grid" width={20} height={20} />
                    {camper.form === "fullyIntegrated"
                    ? "Fully Integrated"
                    : camper.form === "panelTruck"
                    ? "Panel Truck"
                    : camper.form}
                </span>
                )}
                {camper.AC && (
                <span className={styles.camperInfoItem}>
                    <SVG id="wind" width={20} height={20} />
                    AC
                </span>
                )}
                {camper.kitchen && (
                <span className={styles.camperInfoItem}>
                    <SVG id="cup-hot" width={20} height={20} />
                    Kitchen
                </span>
                )}
                {camper.bathroom && (
                <span className={styles.camperInfoItem}>
                    <SVG id="bi-droplet" width={20} height={20} />
                    Bathroom
                </span>
                )}
                {camper.TV && (
                <span className={styles.camperInfoItem}>
                    <SVG id="tv" width={20} height={20} />
                    TV
                </span>
                )}
            </div>
            <Link
                to={`/catalog/${camper.id}`}
                className={styles.showMoreButton}
                target="_blank"
                rel="noopener noreferrer"
            >
                Show More
            </Link>
            </div>
        </div>
        </>
    );
}

export default CamperItem