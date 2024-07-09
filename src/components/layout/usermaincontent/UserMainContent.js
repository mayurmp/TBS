import React, { useState, useEffect } from "react";
import styles from "./UserMainContent.module.css";
import Modals from "../modal/Modals";
import { url } from "../../services/Services";

const UserMainContent = () => {
  //Active Ticket & closed ticket usestates
  const [active, setActive] = useState(true);
  const [closed, setClosed] = useState(false);

  const [closeData, setCloseData] = useState([]);
  const [openData, setOpenData] = useState([]);

  //for modal
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //active and closed data handlers
  const submitactiveHandler = () => {
    setActive(true);
    setClosed(false);
  };


  const submitclosedHandler = () => {
    setActive(false);
    setClosed(true);
  };

  //get active tickets data
  const activeHandler = () => {
    const usertoken = localStorage.getItem("usertoken");
    console.log(usertoken);
    fetch(
      `${url}/user/ticket-status?status=active`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${usertoken}`,
          "ngrok-skip-browser-warning": true,
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setOpenData(data.result);
    
      })
      .then((err) => {
        console.log(err);
      });
  };


  //get closed tickets data
  const closeHandler = () => {
    const usertoken = localStorage.getItem("usertoken");
    fetch(
      `${url}/user/ticket-status?status=closed`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${usertoken}`,
          "ngrok-skip-browser-warning": true,
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCloseData(data.result);
      })
      .then((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    activeHandler();
    closeHandler();
  }, []);

  return (
    <>
      <main className={`container-fluid ${styles.middlediv}`}>
        <div
          className={`row d-flex justify-content-center align-items-center mt-5 mx-auto ${styles.insights}`}
        >
          <div className={`text-center ${styles.tab}`}>
            <input
              type="button"
              className={`btn btn-outline-info px-5 `}
              onClick={submitactiveHandler}
              value="Active"
              onChange={(e) => setActive(e.target.value)}
            />
            <input
              type="button"
              className={`btn btn-outline-info px-5 {${closed} ? ${styles.closebutton}: ""}`}
              onClick={submitclosedHandler}
              value="Closed"
              onChange={(e) => setClosed(e.target.value)}
            />
          </div>

          {active ? (
            <div className={`${styles.maincontent}`}>
              <table
                border="1"
                className="table table-striped table-responsive table-hover"
              >
                <thead>
                  <tr>
                    <th>Ticket No.</th>
                    <th>Category </th>
                    <th>Subject</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Applied on Date</th>
                    <th>Approval Name</th>
                  </tr>
                </thead>

                {openData.map((items) => {
                  return (
                    <tbody>
                      <tr key={items.ticket_id}>
                        <td>{items.ticket_id}</td>
                        <td>{items.category}</td>
                        <td>{items.subject}</td>
                        <td>{items.description}</td>
                        <td>{items.status}</td>
                        <td>{items.priority}</td>
                        <td>{items.creation_date}</td>
                        <td>{items.approval}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          ) : (
            <>
              {closed ? (
                <div className={`${styles.maincontent}`}>
                  <table
                    border="1"
                    className="table table-striped table-responsive table-hover"
                  >
                    <thead>
                      <tr>
                        <th>Ticket No.</th>
                        <th>Category </th>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Applied on Date</th>
                        <th>Approval Name</th>
                      </tr>
                    </thead>

                    {closeData.map((items) => {
                      return (
                        <tbody>
                          <tr key={items.ticket_id}>
                            <td>{items.ticket_id}</td>
                            <td>{items.category}</td>
                            <td>{items.subject}</td>
                            <td>{items.description}</td>
                            <td>{items.status}</td>
                            <td>{items.priority}</td>
                            <td>{items.creation_date}</td>
                            <td>{items.approval}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>

        <div className={`text-start ${styles.right}`}>
          <button
            type="button"
            className={`btn btn-outline-primary p-3 ${styles.newrequestbutton}`}
            onClick={handleShow}
          >
            New Request
          </button>
        </div>
        <Modals handleShow={handleShow} handleClose={handleClose} show={show} />
      </main>
    </>
  );
};

export default UserMainContent;
