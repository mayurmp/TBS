import axios from 'axios';
import React, { useState } from 'react';
import styles from './AddTicketType.module.css';
import { url } from '../../../services/Services';

function AddTicketType (){
  const [success , setSuccess] = useState();
  const [data, setData] = useState({
    categoryName: '',
    approvalName: '',
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    let admintoken=localStorage.getItem('admintoken');
    e.preventDefault();

    try {
      const response = await fetch(`${url}/create/category`,{
        // headers: {
           
        //   'Content-Type': 'application/json',
        //   "ngrok-skip-browser-warning": true,
        //   // Add any other headers required by the API
        //   'Authorization':`Bearer ${admintoken}`
        // },
        
          method: "POST",

          body: JSON.stringify({
           categoryName:data.categoryName,
           approvalName:data.approvalName,
          }),
          headers: {
            Authorization: `Bearer ${admintoken}`,
            "Content-type": "application/json",
          },
        }
      );

      // Handle the response data
      console.log(response.data);

      if(response.status == 200 ){
         setSuccess("Data Submitted Sucessfuly...")
         setData({
          categoryName: '',
          approvalName: '',
        });
      }
      else{
        console.log("Invalid Credentials....");
      }
      // Reset the form
      // setData({
      //   categoryName: '',
      //   approvalName: '',
      // });
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };
  return (
    <div className={`${styles.main_container}`}>
        <form className={`${styles.ticket_form}`} onSubmit={handleSubmit}>
          <h2>Add Ticket Type</h2>
          <div className={`${styles.form_group}`}>
            <label htmlFor="tickettype">Add Ticket Type</label>
            <input
              type="text"
              required
              id={`default-approver`}
              name='categoryName'
              value={data.categoryName}
              placeholder='Add Ticket Type'
              onChange={handleChange}
            />
          </div>

          <div className={`${styles.form_group}`}>
            <label htmlFor="default-approver">Default Approver name</label>
            <input
              type="text"
              required
              id={`${styles.defaultApprover}`}
              name='approvalName'
              value={data.approvalName}
              placeholder='Default Approver name'
              onChange={handleChange}
            />
          </div>

          <div className={`${styles.form_buttons}`}>
          <button type="submit" className="btn btn-outline-primary btn-lg">Submit</button>
          </div>
          <div className={`${styles.success}`}>
            <p className={`${styles.submit_msg}`}>{success}</p>
          </div>
        </form>
    </div>
  );
};

export default AddTicketType;
