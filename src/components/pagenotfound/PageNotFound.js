import React from "react";
import styles from "./PageNotFound.module.css";
const PageNotFound = () => {
  return (
    <>
      <div className={`container-fluid ${styles.pagenotfound}`}>
        <div
          className={`row justify-content-center align-items-center mx-auto ${styles.pagediv}`}
        >
          <p className={`${styles.error}`}>404 Page Not Found</p>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
