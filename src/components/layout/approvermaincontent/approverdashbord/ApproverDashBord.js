import React from "react";
import styles from "./ApproverDashBord.module.css"; // Import modular CSS
import ApproverSideBar from "../approversidebar/ApproverSideBar";
import ApproverViewAllTickets from "../approverviewalltickets/ApproverViewAllTickets";

const ApproverDashBord = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.mainContent}>
        <ApproverViewAllTickets />
      </div>
    </div>
  );
};

export default ApproverDashBord;
