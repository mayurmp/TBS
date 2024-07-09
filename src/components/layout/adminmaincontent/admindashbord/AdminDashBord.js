import React from 'react';
import styles from './AdminDashBord.module.css'; // Import modular CSS
import AdminSideBar from '../adminsidebar/AdminSideBar';
import TicketType from '../tickettype/TicketType';


const AdminDashBord = () => {
  return (
    <div className={styles.dashboard}>
     <AdminSideBar/>
      <div className={styles.mainContent}>
         <TicketType/>
      </div>
    </div>
  );
};

export default AdminDashBord;
