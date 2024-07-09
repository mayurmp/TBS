import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
const Navbar = () => {
  return (
    <>
      <nav className={`navbar navbar-light ${styles.navbardiv}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            <img
              src="/assets/TA_logo.png"
              alt="TA-logo"
              className={`d-inline-block ${styles.logo}`}
            />
            TECH_ALCHEMY
          </Link>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              LOGIN
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/usersignup">UserSignUp</Dropdown.Item>
              <Dropdown.Item href="/">UserSIgnIn</Dropdown.Item>
              <Dropdown.Item href="/adminsignin">AdminSignIN</Dropdown.Item>
              <Dropdown.Item href="/approvalsignin">
                ApprovalSignIN
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
