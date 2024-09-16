import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampers } from "../../api/campers";
import styles from "./CatalogPage.module.css";
import { SVGSource } from "../../components/svg/svg";
import Filters from "../../components/Filters/Filters";
import CamperList from "../../components/CamperList/CamperList";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const { paginatedCampers, filteredList } = useSelector(
    (state) => state.campers
  );

  const hasMoreCampers = filteredList.length > paginatedCampers.length;

  // Fetch campers
  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  return (
    <>
      <div className={styles.catalogPage}>
        <Filters />
        <CamperList campers={paginatedCampers} hasMore={hasMoreCampers} />
      </div>
      <SVGSource />
    </>
  );
};

export default CatalogPage;
