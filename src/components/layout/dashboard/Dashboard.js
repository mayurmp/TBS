import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import UserMainContent from "../usermaincontent/UserMainContent";
import LogoutModal from "../logoutmodal/LogoutModal";
import ApproverDashBord from "../approvermaincontent/approverdashbord/ApproverDashBord";
import ApproverViewAllTickets from "../approvermaincontent/approverviewalltickets/ApproverViewAllTickets";
import AdminDashBord from "../adminmaincontent/admindashbord/AdminDashBord";
import HomeMainContent from "../homemaincontent/HomeMainContent";
import ViewAllTickets from "../adminmaincontent/viewalltickets/ViewAllTickets";
import { url } from "../../services/Services";

const Dashboard = () => {
  //for sidebar
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  //to display user name
  const [username, setUsername] = useState([]);

  //sidebar open close
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const sidebarHandler = () => {
    setVisible(!visible);
  };

  //display name handler
  const userNameHandler = () => {
    let usertoken = localStorage.getItem("usertoken");
    let approvaltoken = localStorage.getItem("approvaltoken");
    let admintoken = localStorage.getItem("admintoken");
    var token = "";
    if (usertoken) {
      token = usertoken;
    } else if (approvaltoken) {
      token = approvaltoken;
    } else {
      token = admintoken;
    }
    fetch(`${url}/user/details`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": true,
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })

      .then((data) => {
        setUsername(data.result[0].first_name);
      });
    // .then((err) => {
    //   console.log(err);
    // });
  };

  useEffect(() => {
    userNameHandler();
  }, []);

  return (
    <>
      <div className={`container-fluid ${styles.main_div}`}>
        <aside className={visible ? `${styles.block}` : `${styles.none}`}>
          <div className={`${styles.top}`}>
            <div className={`${styles.profile}`}>
              <img src="/assets/TA_logo.png" alt="TALogo" />
            </div>
            <button
              className={`${styles.close}`}
              id="close-btn"
              onClick={sidebarHandler}
            >
              <span className="material-symbols-sharp">close</span>
            </button>
          </div>

          <div className="d-flex mt-2">
            <img
              src="/assets/person.png"
              alt="profile"
              className={`${styles.profilephoto}`}
            />

            <div className={`mx-2 ${styles.profile}`}>
              <h3>Hi {username}</h3>
              <Link href="#" className="text-decoration-none">
                View my info
              </Link>
            </div>
          </div>
          <div className={`${styles.sidebar}`}>
            <Link href="#" className="active">
              <span className="material-symbols-sharp">home</span>
              <h3>Home</h3>
            </Link>

            <Link href="#">
              <span className="material-symbols-sharp">vibration</span>
              <h3>Feeds</h3>
            </Link>

            <Link href="#">
              <span className="material-symbols-sharp">event</span>
              <h3>TODO</h3>
            </Link>

            <Link href="#">
              <span className="material-symbols-sharp">currency_rupee</span>
              <h3>Salary</h3>
            </Link>

            <Link href="#">
              <span className="material-symbols-sharp">move_group</span>
              <h3>Leave</h3>
            </Link>

            <Link href="#">
              <span className="material-symbols-sharp">school</span>
              <h3>Attendance</h3>
            </Link>

            <Link href="#">
              <span className="material-symbols-sharp">folder</span>
              <h3>Expense Claims</h3>
            </Link>

            <Link href="#">
              <span className="material-symbols-sharp">file_copy</span>
              <h3>Documnet Center</h3>
            </Link>

            <Link to="/people">
              <span className="material-symbols-sharp">person</span>
              <h3>People</h3>
            </Link>

            {localStorage.getItem("usertoken") ? (
              <Link to="/usermaincontent">
                <span className="material-symbols-sharp">info</span>
                <h3>Helpdesk</h3>
              </Link>
            ) : localStorage.getItem("admintoken") ? (
              <Link to="/adminmaincontent">
                <span className="material-symbols-sharp">info</span>
                <h3>Helpdesk</h3>{" "}
              </Link>
            ) : localStorage.getItem("approvaltoken") ? (
              <Link to="/approvermaincontent">
                <span className="material-symbols-sharp">info</span>
                <h3>Helpdesk</h3>{" "}
              </Link>
            ) : (
              ""
            )}

            <Link href="#">
              <span className="material-symbols-sharp">rebase</span>
              <h3>Workflow Delegates</h3>
            </Link>

            {localStorage.getItem("usertoken") ? (
              <Link href="#">
                <span className="material-symbols-sharp">logout</span>
                <h3 onClick={handleShow}>Logout</h3>
              </Link>
            ) : localStorage.getItem("admintoken") ? (
              <Link href="#">
                <span className="material-symbols-sharp">logout</span>
                <h3 onClick={handleShow}>Logout</h3>{" "}
              </Link>
            ) : localStorage.getItem("approvaltoken") ? (
              <Link href="#">
                <span className="material-symbols-sharp">logout</span>
                <h3 onClick={handleShow}>Logout</h3>
              </Link>
            ) : (
              ""
            )}
          </div>
          <LogoutModal
            handleShow={handleShow}
            handleClose={handleClose}
            show={show}
          />
        </aside>

        <div className={`${styles.content}`}>
          <div className={`d-flex ${styles.heading}`}>
            <p className={`${styles.helpdesk}`}>Dashboard</p>
          </div>
          <Routes>
            <Route path="/dashboard" element={<HomeMainContent />} />
            <Route path="/usermaincontent" element={<UserMainContent />} />

            <Route path="/approvermaincontent" element={<ApproverDashBord />} />
            <Route path="/adminmaincontent" element={<AdminDashBord />} />
            <Route
              path="/approvalviewalltickets"
              element={<ApproverViewAllTickets />}
            />
            <Route path="/viewalltickets" element={<ViewAllTickets />} />
          </Routes>
        </div>


        <div className={`${styles.right}`}>
          <div className={`${styles.top}`}>
            <button
              id="menu-btn"
              className={`bg-primary ${styles.menubtn}`}
              onClick={sidebarHandler}
            >
              <span className="material-symbols-sharp">menu</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
