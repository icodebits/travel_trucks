import { useSelector, useDispatch } from "react-redux";
import {
  setLocation,
  setType,
  setHasAC,
  setHasKitchen,
  setHasBathroom,
  setHasTV,
  setTransmission,
} from "../../redux/filtersSlice";
import styles from "./Filters.module.css";
import { SVG } from "../../components/svg/svg";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  
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

  return (
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
            className={`${styles.checkboxLabel} ${styles.checkboxLabelLong} ${
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
  );
};

export default Filters;
