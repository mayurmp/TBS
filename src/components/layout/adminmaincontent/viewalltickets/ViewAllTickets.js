// import React from 'react'
import styles from "./ViewAllTickets.module.css";
import React, { useEffect, useState } from 'react';

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { url } from "../../../services/Services";
import { Button, Modal } from "react-bootstrap";



const ViewAllTickets = () => {
  const [value, setValue] = React.useState("1");
  const [users, setUserData] = React.useState([]);
  const [id,setId]=useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);


  const [visible, setVisible] = useState(false);
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

  // var admintoken=localStorage.getItem('admintoken')
  // console.log("token",admintoken)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // OPEN
  async function activeTicket() {
  
    let admintoken=localStorage.getItem('admintoken');
    // console.log("token",admintoken)
    const response = await fetch(`${url}/admin/status/all-tickets?status=active` , {
      method: 'GET',
      headers: { "ngrok-skip-browser-warning": true,
        'Authorization' : `Bearer ${admintoken}`,
        'Content-Type': 'application/json'
      },
    })
    .then (response=> response.json())
    // console.log(response.result[0].ticket_id)
    setUserData(response.result)
    

    
  }

  // close

  async function closeTicket() {
   
    let admintoken=localStorage.getItem('admintoken');
    const response = await fetch(`${url}/admin/status/all-tickets?status=closed`, {
      method: 'GET',
      headers: { "ngrok-skip-browser-warning": true,
      'Authorization':`Bearer ${admintoken}`,
        'Content-Type': 'application/json'
      },
    })
    .then (response=> response.json())
  
    setUserData(response.result)
 }

//   STATUS
   
const handleButtonClicks = (id) => {
 
  let admintoken=localStorage.getItem('admintoken');
  console.log("ID",id)
  let statusId=id;
    setLoading(true);
    setSuccess(false);
    setError(null);
   
   
    fetch(`${url}/update/ticket-status`, {
      method: 'PATCH',
      headers: {
        "ngrok-skip-browser-warning": true,
        'Authorization' : `Bearer ${admintoken}`,
        'Content-Type': 'application/json',
        // Add any other headers required by the API
      },
      body: JSON.stringify({ ticketId: statusId }), // Replace with the actual data to be sent
    }).then((data)=>{
         console.log(data)
         
    })
    activeTicket()
    handleClose()
  };
   
 
  
  return (
    <div className={`${styles.main_box}`}>
      <Box sx={{ width: "80%", typography: "body1" }} className={`${styles.box}`}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="Open" value="1" onClick={activeTicket}/>
            <Tab label="Close" value="2" onClick={closeTicket}/>
            
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className={`${styles.tabpanel_box}`}>
            <div className={`${styles.box_row_1}`}>
              <div className={`${styles.srno}`}>
                <div className={`${styles.srno_1}`}>
                  <b>Ticket Id</b>
                </div>
              </div>

              <div className={`${styles.category}`}>
                <div className={`${styles.category_1}`}>
                  <b>Category</b>
                </div>
              </div>

              <div className={`${styles.assignedto}`}>
                <div className={`${styles.assignedto_1}`}>
                  <b>Assigned To</b>
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

              <div className={`${styles.appliedondate}`}>
                <div className={`${styles.appliedondate_1}`}>
                  <b>Applied On Date</b>
                </div>
              </div>

               <div className={`${styles.button}`}>
                <div className={`${styles.button_1}`}>
                  <b>Button</b>
                </div>
              </div> 

            </div>
            {users.map((items)=>(
              <div className={`${styles.box_row_1}`} id={`${styles.row_2}`} key={items.ticket_id}>
              <div className={`${styles.srno}`}>
                <div className={`${styles.srno_1_txt}`}>
                  <p>{items.ticket_id}</p>
                </div>
              </div>

              <div className={`${styles.category}`}>
                <div className={`${styles.category_1_txt}`}>
                <p>{items.category}</p>
                </div>
              </div>

              <div className={`${styles.assignedto}`}>
                <div className={`${styles.assignedto_1_txt}`}>
                <p>{items.approval}</p>
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

              <div className={`${styles.appliedondate}`}>
                <div className={`${styles.appliedondate_1_txt}`}>
                <p>{items.creation_date}</p>
                </div>
              </div>

              <div className={`${styles.button}`}>
                <div className={`${styles.button_1_txt}`}>
                <button type="button" className="btn btn-info" onClick={(id)=>handleShow(items.ticket_id)}>Change Status
                </button>
                </div>
              </div>
            </div>
            ))




            }


<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hello</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to change Status?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>handleButtonClicks(id)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>


          </div>
        </TabPanel>
        <TabPanel value="2">
        <div className={`${styles.tabpanel_box}`}>
            <div className={`${styles.box_2_row_1}`}>
              <div className={`${styles.srno}`}>
                <div className={`${styles.srno_1}`}>
                  <b>Ticket Id</b>
                </div>
              </div>

              <div className={`${styles.category}`}>
                <div className={`${styles.category_1}`}>
                  <b>Category</b>
                </div>
              </div>

              <div className={`${styles.assignedto}`}>
                <div className={`${styles.assignedto_1}`}>
                  <b>Assigned To</b>
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

              <div className={`${styles.appliedondate}`}>
                <div className={`${styles.appliedondate_1}`}>
                  <b>Applied On Date</b>
                </div>
              </div>


            </div>
            {users.map((items)=>(
            <div className={`${styles.box_2_row_1}`} id={`${styles.row_2}`} key={items.ticket_id}>
              <div className={`${styles.srno}`}>
                <div className={`${styles.srno_1_txt}`}>
                <p>{items.ticket_id}</p>
                </div>
              </div>

              <div className={`${styles.category}`}>
                <div className={`${styles.category_1_txt}`}>
                <p>{items.category}</p>
                </div>
              </div>

              <div className={`${styles.assignedto}`}>
                <div className={`${styles.assignedto_1_txt}`}>
                <p>{items.approval}</p>
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

              <div className={`${styles.appliedondate}`}>
                <div className={`${styles.appliedondate_1_txt}`}>
                <p>{items.creation_date}</p>
                </div>
              </div>

            </div>
             ))

            }
          </div>
        </TabPanel>
        
      </TabContext>
    </Box>
    </div>
  )
}

export default ViewAllTickets