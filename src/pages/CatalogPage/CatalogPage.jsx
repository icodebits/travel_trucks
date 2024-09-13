// src/pages/CatalogPage.js
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCampers,
  setFilteredCampers,
  resetFilteredList,
} from "../../redux/campersSlice";
import {
  setLocation,
  setType,
  setHasAC,
  setHasKitchen,
  setHasBathroom,
  setHasTV,
  setTransmission,
  resetFilters,
} from "../../redux/filtersSlice";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import styles from "./CatalogPage.module.css";

import { SVGSource, SVG } from "../../components/svg/svg";


const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.list);
  const filteredCampers = useSelector((state) => state.campers.filteredList);
  const filters = useSelector((state) => state.filters);
  const status = useSelector((state) => state.campers.status);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4; // Number of items per page

  // Fetch campers data
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchCampers());
    };
    fetch();
  }, [dispatch]);

  // Apply filters
  useEffect(() => {
    const applyFilters = () => {
      let filtered = campers;
      if (filters.location) {
        filtered = filtered.filter((camper) =>
          camper.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      if (filters.type) {
        filtered = filtered.filter((camper) => camper.form === filters.type);
      }
      if (filters.hasAC) {
        filtered = filtered.filter((camper) => camper.AC);
      }
      if (filters.hasKitchen) {
        filtered = filtered.filter((camper) => camper.kitchen);
      }
      if (filters.hasBathroom) {
        filtered = filtered.filter((camper) => camper.bathroom);
      }
      if (filters.hasTV) {
        filtered = filtered.filter((camper) => camper.TV);
      }
      if (filters.transmission) {
        filtered = filtered.filter((camper) => camper.transmission === "automatic");
      }
      dispatch(setFilteredCampers(filtered));
    };

    resetFilters();
    resetFilteredList();
    
    applyFilters();
    setPage(1);
  }, [filters, dispatch, campers]);

  // Handle filter changes
  const handleFilterChange = (event) => {
    const { name, value, checked, type } = event.target;
    if (type === "checkbox") {
      switch (name) {
        case "hasAC":
          dispatch(setHasAC(checked));
          break;
        case "hasKitchen":
          dispatch(setHasKitchen(checked));
          break;
        case "hasBathroom":
          dispatch(setHasBathroom(checked));
          break;
        case "hasTV":
          dispatch(setHasTV(checked));
          break;
        case "isAutomatic":
          dispatch(setTransmission(checked ? "automatic" : ""));
          break;
        default:
          break;
      }
    } else {
      dispatch(name === "location" ? setLocation(value) : setType(value));
    }
  };

  // Load more campers
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Slice the filtered campers list for pagination
  const displayedCampers = filteredCampers && filteredCampers.length > 0 && filteredCampers.slice(
    0,
    page * itemsPerPage
  );
  
  return (
    <div className={styles.catalogPage}>
      <div className={styles.filtersSection}>
        <div className={styles.locationLabel}>Location</div>
        <div className={styles.locationInputContainer}>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
            className={styles.locationInput}
          />
          <SVG id="map" className={styles.inputIcon} />
        </div>

        <div className={styles.filtersLabel}>Filters</div>

        <div className={styles.filterGroup}>
          <div className={styles.filterTitle}>Vehicle equipment</div>
          <div className={styles.checkboxGroup}>
            <label
              className={`${styles.checkboxLabel} ${
                filters.hasAC ? styles.checkboxLabelActive : ""
              }`}
            >
              <SVG id="wind" width={32} height={32} />
              <input
                type="checkbox"
                name="hasAC"
                checked={filters.hasAC}
                onChange={handleFilterChange}
              />
              AC
            </label>
            <label
              className={`${styles.checkboxLabel} ${
                filters.transmission === "automatic"
                  ? styles.checkboxLabelActive
                  : ""
              }`}
            >
              <SVG id="diagram" width={32} height={32} />
              <input
                type="checkbox"
                name="isAutomatic"
                checked={filters.transmission === "automatic"}
                onChange={handleFilterChange}
              />
              Automatic
            </label>
            <label
              className={`${styles.checkboxLabel} ${
                filters.hasKitchen ? styles.checkboxLabelActive : ""
              }`}
            >
              <SVG id="cup-hot" width={32} height={32} />
              <input
                type="checkbox"
                name="hasKitchen"
                checked={filters.hasKitchen}
                onChange={handleFilterChange}
              />
              Kitchen
            </label>
            <label
              className={`${styles.checkboxLabel} ${
                filters.hasTV ? styles.checkboxLabelActive : ""
              }`}
            >
              <SVG id="tv" width={32} height={32} />
              <input
                type="checkbox"
                name="hasTV"
                checked={filters.hasTV}
                onChange={handleFilterChange}
              />
              TV
            </label>
            <label
              className={`${styles.checkboxLabel} ${
                filters.hasBathroom ? styles.checkboxLabelActive : ""
              }`}
            >
              <SVG id="bi-droplet" width={32} height={32} />
              <input
                type="checkbox"
                name="hasBathroom"
                checked={filters.hasBathroom}
                onChange={handleFilterChange}
              />
              Bathroom
            </label>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <div className={styles.filterTitle}>Vehicle type</div>

          <div className={styles.checkboxGroup}>
            <label
              className={`${styles.checkboxLabel} ${
                styles.checkboxLabelLong
              } ${
                filters.type === "panelTruck" ? styles.checkboxLabelActive : ""
              }`}
            >
              <SVG id="bi-grid-1x2" width={32} height={32} />
              <input
                type="radio"
                name="type"
                value="panelTruck"
                checked={filters.type === "panelTruck"}
                onChange={handleFilterChange}
              />
              Panel Truck
            </label>
            <label
              className={`${styles.checkboxLabel} ${styles.checkboxLabelLong} ${
                filters.type === "fullyIntegrated"
                  ? styles.checkboxLabelActive
                  : ""
              }`}
            >
              <SVG id="bi-grid" width={32} height={32} />
              <input
                type="radio"
                name="type"
                value="fullyIntegrated"
                checked={filters.type === "fullyIntegrated"}
                onChange={handleFilterChange}
              />
              Fully integrated
            </label>
            <label
              className={`${styles.checkboxLabel} ${
                filters.type === "alcove" ? styles.checkboxLabelActive : ""
              }`}
            >
              <SVG id="bi-grid-3x3-gap" width={32} height={32} />
              <input
                type="radio"
                name="type"
                value="alcove"
                checked={filters.type === "alcove"}
                onChange={handleFilterChange}
              />
              Alcove
            </label>
          </div>
        </div>
        {/*<button className={styles.showMoreButton}>Search</button>*/}
      </div>

      <div className={styles.campersList}>
        {status === "loading" && <Loader />}
        {status === "succeeded" &&
          displayedCampers.map((camper) => (
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
                      <SVG
                        id="favourite"
                        width={24}
                        height={24}
                        className={styles.camperFavourite}
                      />
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

                <div className={styles.camperDescription}>
                  {camper.description}
                </div>

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
                >
                  Show More
                </Link>
              </div>
            </div>
          ))}
        {status === "succeeded" && displayedCampers.length === 0 && (
          <p className={styles.noCampersFound}>No campers found</p>
        )}
        {status === "failed" && (
          <p className={styles.noCampersFound}>Error loading campers</p>
        )}

        {status === "succeeded" &&
          displayedCampers.length < filteredCampers.length && (
            <button onClick={loadMore} className={styles.loadMoreBtn}>
              Load More
            </button>
          )}
      </div>
      <SVGSource />
    </div>
  );
};

export default CatalogPage;
