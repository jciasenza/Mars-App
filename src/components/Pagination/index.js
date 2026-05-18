import React from "react";
import styles from "./Pagination.module.css";
import classnames from "classnames";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const Pagination = ({ page, setPage, totalPages = 1 }) => {
  const increasePage = () => {
    if (page >= totalPages) return;
    setPage(page + 1);
  };

  const decreasePage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const getPageNumbers = () => {
    const nums = [];
    for (let i = 1; i <= totalPages; i++) {
      nums.push(i);
    }
    return nums;
  };

  return (
    <div className={styles.pagination}>
      <div className={styles["input-container"]}>
        <div
          onClick={decreasePage}
          className={classnames(styles.inline, styles["arrow-left"])}
          style={{ cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.4 : 1 }}
        >
          <AiOutlineArrowLeft />
        </div>
        
        <div className={styles.numbers}>
          {getPageNumbers().map((num) => (
            <span
              key={num}
              onClick={() => {
                if (num !== page) setPage(num);
              }}
              className={classnames(styles.number, {
                active: num === page,
              })}
              style={{ cursor: num === page ? "default" : "pointer" }}
            >
              {num}
            </span>
          ))}
        </div>

        <div
          className={classnames(styles.inline, styles["arrow-right"])}
          onClick={increasePage}
          style={{ cursor: page === totalPages ? "not-allowed" : "pointer", opacity: page === totalPages ? 0.4 : 1 }}
        >
          <AiOutlineArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
