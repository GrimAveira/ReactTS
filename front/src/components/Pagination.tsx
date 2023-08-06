import React from "react";
import styles from "../css/pages/ReportApplication.module.css";

function Pagination({
  counter,
  length,
  setCounter,
}: {
  counter: number;
  length: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className={styles.containerPagination}>
      <button
        disabled={counter < 1 ? true : false}
        className={styles.buttonPag}
        onClick={() => {
          setCounter(counter - 1);
        }}
      >
        {"<"}
      </button>
      <div className={styles.counter}>{counter + 1}</div>
      <button
        disabled={counter === length - 1 ? true : false}
        className={styles.buttonPag}
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
