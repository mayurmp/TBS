import React from 'react'
import styles from "./TicketTypeList.module.css"
export function TicketTypeList () {
  return (
    <div className={`${styles.box_1}`}>
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
                  <b>Default aprover</b>
                </label>
              </div>
            </div>

            <div className={`${styles.container_row_1}`}>
              <div className={`${styles.srno}`}>
              <label className={`${styles.label}`}>
                  <p className={`${styles.label_p}`}>1</p>
                </label>
              </div>
              <div className={`${styles.ticket_type}`}>
              <label className={`${styles.label}`}>
                  <p className={`${styles.label_p}`}>Mayur Patil</p>
                </label>
              </div>
              <div className={`${styles.aprover}`}>
              <label className={`${styles.label}`}>
                  <p className={`${styles.label_p}`}>HR</p>
                </label>
              </div>
            </div>
    </div>
    </div>
  )
}
