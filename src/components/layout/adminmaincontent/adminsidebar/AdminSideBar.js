import React from "react";
import styles from "../adminsidebar/AdminSideBar.module.css"; // Import modular CSS
import { Link, Routes, Route } from "react-router-dom";
import ViewAllTickets from "../viewalltickets/ViewAllTickets";

const AdminSideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={`${styles.button}`}>
        <div className={`${styles.txt}`}>
          <Routes>
            <Route path="/viewalltickets" element={<ViewAllTickets/>} />
          </Routes>
          <Link to="/viewalltickets" className={`${styles.link}`}>
            VIEW ALL TICKETS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
