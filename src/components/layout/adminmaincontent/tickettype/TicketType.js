import styles from "./TicketType.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddTicketType from "../addtickettype/AddTicketType";
import { url } from "../../../services/Services";

export default function TicketType() {
  const [value, setValue] = React.useState("1");
  const [users, setUserData] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  async function ticketType() {
    let admintoken=localStorage.getItem('admintoken');
    const response = await fetch(
      `${url}/view/category`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": true,
          'Authorization':`Bearer ${admintoken}`,
          // 'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJUQTEzNyIsImlhdCI6MTY4Nzg1ODAwMywiZXhwIjoxNjg3OTQ0NDAzfQ.j652bu-2k0BcX1MOhjEGXcKfeAneOcta4N2FY2sQPR8`,
          'Content-Type': 'application/json'
        },
      }
    ).then((response) => response.json());
    console.log(response.result);
    setUserData(response.result);
  }

  return (
    <Box className={`${styles.box}`} sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className={`${styles.tab_nav}`}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="Ticket Type" value="1" onClick={ticketType} />
            <Tab label="Add Ticket Type" value="2" />
          </TabList>
        </Box>

        <TabPanel value="1" className={`${styles.tab_nav}`}>
          <div className={`${styles.tab_container}`}>
            <div className={`${styles.container_row_1}`}>
              <div className={`${styles.srno}`}>
                <label className={`${styles.label}`}>
                  <b>Sr.No</b>
                </label>
              </div>
              <div className={`${styles.ticket_type}`}>
                <label className={`${styles.label}`}>
                  <b>Ticket Type</b>
                </label>
              </div>
              <div className={`${styles.aprover}`}>
                <label className={`${styles.label}`}>
                  <b>Default Aprover</b>
                </label>
              </div>

            </div>
            {users.map((items) => (
              <div className={`${styles.container_row_1}`}>
                <div className={`${styles.srno}`}>
                  <label className={`${styles.label}`}>
                    <p className={`${styles.label_p}`}>{items.category_id}</p>
                  </label>
                </div>
                <div className={`${styles.ticket_type}`}>
                  <label className={`${styles.label}`}>
                    <p className={`${styles.label_p}`}>{items.category_name}</p>
                  </label>
                </div>
                <div className={`${styles.aprover}`}>
                  <label className={`${styles.label}`}>
                    <p className={`${styles.label_p}`}>{items.approval_name}</p>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel value="2">
          <AddTicketType />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
