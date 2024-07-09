import React, { useState } from "react";
import styles from "./ApproverViewAllTickets.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { url } from "../../../services/Services";
import { Button, Modal } from "react-bootstrap";

export default function ApproverViewAllTickets() {
  const [value, setValue] = React.useState("1");
  const [users, setUserData] = React.useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);

  //sidebar open close
  const handleClose = () => {
   setShow(false);
 };
 const handleShow = (id) => {
   setShow(true,id);
   console.log(id)
   setId(id);
 };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // open
  async function activeTickets() {
    const approvaltoken = localStorage.getItem("approvaltoken");
    const resp = await fetch(`${url}/approval/ticket-status?status=active`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${approvaltoken}`,
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
    // console.log(resp.result);
    setUserData(resp.result);
  }

  // close

  async function closeTickets() {
    const approvaltoken = localStorage.getItem("approvaltoken");
    const response = await fetch(
      `${url}/approval/ticket-status?status=closed`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${approvaltoken}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());
    // console.log(response.result);
    setUserData(response.result);
  }

  // STATUS

  const handleButtonClick = (id) => {
    const approvaltoken = localStorage.getItem("approvaltoken");
    // console.log("ID", ids);
    let statusId = id;
    setLoading(true);
    setSuccess(false);
    setError(null);

    fetch(`${url}/update/ticket-status`, {
      method: "PATCH",
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${approvaltoken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticketId: statusId }), // Replace with the actual data to be sent
    }).then((data) => {
      console.log(data);
    });
    activeTickets();
    handleClose();
  };

  return (
    <div className={`${styles.main_box}`}>
      <Box
        sx={{ width: "80%", typography: "body1" }}
        className={`${styles.box}`}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="Open" value="1" onClick={activeTickets} />
              <Tab label="Closed" value="2" onClick={closeTickets} />
            </TabList>
          </Box>

          {/* OPEN */}
          <TabPanel value="1">
            <div className={`${styles.tabpanel_box}`}>
              <div className={`${styles.box_row_1}`}>
                <div className={`${styles.ticket_id}`}>
                  <div className={`${styles.ticket_id_1}`}>
                    <b>Ticket ID</b>
                  </div>
                </div>

                <div className={`${styles.category}`}>
                  <div className={`${styles.category_1}`}>
                    <b>Category</b>
                  </div>
                </div>

                <div className={`${styles.status}`}>
                  <div className={`${styles.status_1}`}>
                    <b>Status</b>
                  </div>
                </div>

                <div className={`${styles.priority}`}>
                  <div className={`${styles.priority_1}`}>
                    <b>Priority</b>
                  </div>
                </div>

                <div className={`${styles.subject}`}>
                  <div className={`${styles.subject_1}`}>
                    <b>Subject</b>
                  </div>
                </div>

                <div className={`${styles.discription}`}>
                  <div className={`${styles.discription_1}`}>
                    <b>Discription</b>
                  </div>
                </div>

                <div className={`${styles.creation_date}`}>
                  <div className={`${styles.creation_date_1}`}>
                    <b>Creation Date</b>
                  </div>
                </div>

                <div className={`${styles.button}`}>
                  <div className={`${styles.button_1}`}>
                    <b>Button</b>
                  </div>
                </div>
              </div>

              {users.map((items) => (
                <div className={`${styles.scroll}`} key={items.ticket_id}>
                  <div className={`${styles.box_row_1}`} id={`${styles.row_2}`}>
                    <div className={`${styles.ticket_id}`}>
                      <div className={`${styles.ticket_id_1_txt}`}>
                        <p>{items.ticket_id}</p>
                      </div>
                    </div>

                    <div className={`${styles.category}`}>
                      <div className={`${styles.category_1_txt}`}>
                        <p>{items.category}</p>
                      </div>
                    </div>

                    <div className={`${styles.status}`}>
                      <div className={`${styles.status_1_txt}`}>
                        <p>{items.status}</p>
                      </div>
                    </div>

                    <div className={`${styles.priority}`}>
                      <div className={`${styles.priority_1_txt}`}>
                        <p>{items.priority}</p>
                      </div>
                    </div>

                    <div className={`${styles.subject}`}>
                      <div className={`${styles.subject_1_txt}`}>
                        <p>{items.subject}</p>
                      </div>
                    </div>

                    <div className={`${styles.discription}`}>
                      <div className={`${styles.discription_1_txt}`}>
                        <p>{items.description}</p>
                      </div>
                    </div>

                    <div className={`${styles.creation_date}`}>
                      <div className={`${styles.creation_date_1_txt}`}>
                        <p>{items.creation_date}</p>
                      </div>
                    </div>

                    <div className={`${styles.button}`}>
                      <div className={`${styles.button_1_txt}`}>
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={(id) => handleShow(items.ticket_id)}
                        >
                         Change Status
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hello</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to change Status?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>handleButtonClick(id)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>


            </div>
          </TabPanel>

          {/* CLOSED */}
          <TabPanel value="2">
            <div className={`${styles.tabpanel_box}`}>
              <div className={`${styles.box_2_row_1}`}>
                <div className={`${styles.ticket_id}`}>
                  <div className={`${styles.ticket_id_1}`}>
                    <b>Ticket ID</b>
                  </div>
                </div>

                <div className={`${styles.category}`}>
                  <div className={`${styles.category_1}`}>
                    <b>Category</b>
                  </div>
                </div>

                <div className={`${styles.status}`}>
                  <div className={`${styles.status_1}`}>
                    <b>Status</b>
                  </div>
                </div>

                <div className={`${styles.priority}`}>
                  <div className={`${styles.priority_1}`}>
                    <b>Priority</b>
                  </div>
                </div>

                <div className={`${styles.subject}`}>
                  <div className={`${styles.subject_1}`}>
                    <b>Subject</b>
                  </div>
                </div>

                <div className={`${styles.discription}`}>
                  <div className={`${styles.discription_1}`}>
                    <b>Discription</b>
                  </div>
                </div>

                <div className={`${styles.creation_date}`}>
                  <div className={`${styles.creation_date_1}`}>
                    <b>Creation Date</b>
                  </div>
                </div>
              </div>

              {users.map((items) => (
                <div className={`${styles.box_2_row_1}`} id={`${styles.row_2}`} key={items.ticket_id}>
                  <div className={`${styles.ticket_id}`}>
                    <div className={`${styles.ticket_id_1_txt}`}>
                      <p>{items.ticket_id}</p>
                    </div>
                  </div>

                  <div className={`${styles.category}`}>
                    <div className={`${styles.category_1_txt}`}>
                      <p>{items.category}</p>
                    </div>
                  </div>

                  <div className={`${styles.status}`}>
                    <div className={`${styles.status_1_txt}`}>
                      <p>{items.status}</p>
                    </div>
                  </div>

                  <div className={`${styles.priority}`}>
                    <div className={`${styles.priority_1_txt}`}>
                      <p>{items.priority}</p>
                    </div>
                  </div>

                  <div className={`${styles.subject}`}>
                    <div className={`${styles.subject_1_txt}`}>
                      <p>{items.subject}</p>
                    </div>
                  </div>

                  <div className={`${styles.discription}`}>
                    <div className={`${styles.discription_1_txt}`}>
                      <p>{items.description}</p>
                    </div>
                  </div>

                  <div className={`${styles.creation_date}`}>
                    <div className={`${styles.creation_date_1_txt}`}>
                      <p>{items.creation_date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
