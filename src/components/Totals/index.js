import React from "react";
import styles from "./total.module.css";
import { useLanguage } from "../../contexts/LanguageContext";

const TotalsPhotos = ({ total }) => {
  const { t } = useLanguage();
  
  return (
    <div className={styles["total"]}>
      {t("gallery_totals")} : {total}
    </div>
  );
};
export default TotalsPhotos;
