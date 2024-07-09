import React from "react";
import styles from "./ApproverSideBar.module.css";
import { Link, Routes, Route } from "react-router-dom";
import ApproverViewAllTickets from "../approverviewalltickets/ApproverViewAllTickets";

const ApproverSideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={`${styles.approver}`}>
        <b className={`${styles.approver_b}`}>APPROVER</b>
      </div>
      <div className={`${styles.button}`}>
        <div className={`${styles.txt}`}>
          <Link to="/approverviewallticket" className={`${styles.link}`}>
            VIEW ALL TICKETS
          </Link>
          <Routes>
            <Route
              path="/approverviewallticket"
              element={<ApproverViewAllTickets />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ApproverSideBar;
