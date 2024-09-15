import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampers } from "../../api/campers";
import {
  setFilteredCampers,
  resetFilteredList,
} from "../../redux/campersSlice";
import {
  resetFilters,
} from "../../redux/filtersSlice";
import styles from "./CatalogPage.module.css";

import { SVGSource } from "../../components/svg/svg";
import Filters from "../../components/Filters/Filters";
import CamperList from "../../components/CamperList/CamperList";


const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.list);
  const filteredCampers = useSelector((state) => state.campers.filteredList);
  const filters = useSelector((state) => state.filters);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4; // Number of items per page

  // Fetch campers data
  useEffect(() => {
      dispatch(fetchCampers());
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
    <>
      <div className={styles.catalogPage}>
        <Filters />

        <CamperList
          campers={displayedCampers}
          filteredCampers={filteredCampers}
          loadMore={loadMore}
        />
      </div>
      <SVGSource />
    </>
  );
};

export default CatalogPage;
