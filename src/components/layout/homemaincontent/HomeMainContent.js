import React from "react";
import styles from "./HomeMainContent.module.css";

const HomeMainContent = () => {
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-4 col-sm-6 mt-5">
              <div className={`card ${styles.cardblock}`}>
                <h3>Review</h3>
                <img
                  src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg"
                  alt="Photo of sunset"
                  className={`${styles.cardimage}`}
                />
                <h5 className="card-title mt-3 mb-3">
                  Sierra Web Development • Owner
                </h5>
                <p className="card-text">
                  This is a company that builds websites, web apps and
                  e-commerce solutions.
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mt-5">
              <div className={`card ${styles.cardblock}`}>
                <h3>PaySlip</h3>
                <img
                  src="https://static.pexels.com/photos/7357/startup-photos.jpg"
                  alt="Photo of sunset"
                  className={`${styles.cardimage}`}
                />
                <h5 className="card-title  mt-3 mb-3">ProVyuh</h5>
                <p className="card-text">
                  Uh oh! Your Payslip will show up here after the release of
                  Payroll.
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mt-5">
              <div className={`card ${styles.cardblock}`}>
                <h3>IT Declaration</h3>
                <img
                  src="https://static.pexels.com/photos/262550/pexels-photo-262550.jpeg"
                  alt="Photo of sunset"
                  className={`${styles.cardimage}`}
                />
                <h5 className="card-title  mt-3 mb-3">ProVyuh</h5>
                <p className="card-text">
                  Uh oh! You have missed submitting your IT declaration. Please
                  submit it once the window opens.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-4 col-sm-6 mt-5">
              <div className={`card ${styles.cardblock}`}>
                <h3>Track</h3>
                <img
                  src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg"
                  alt="Photo of sunset"
                  className={`${styles.cardimage}`}
                />
                <h5 className="card-title mt-3 mb-3">
                  Sierra Web Development • Owner
                </h5>
                <p className="card-text">
                  All good! You've nothing new to track.
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mt-5">
              <div className={`card ${styles.cardblock}`}>
                <h3>Quick Access</h3>
                <img
                  src="https://static.pexels.com/photos/7357/startup-photos.jpg"
                  alt="Photo of sunset"
                  className={`${styles.cardimage}`}
                />
                <h5 className="card-title  mt-3 mb-3">ProVyuh</h5>
                <p className="card-text">
                  Use quick access to view important salary details.
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mt-5">
              <div className={`card ${styles.cardblock}`}>
                <h3>Upcoming Holidays</h3>
                <img
                  src="https://static.pexels.com/photos/262550/pexels-photo-262550.jpeg"
                  alt="Photo of sunset"
                  className={`${styles.cardimage}`}
                />
                <h5 className="card-title  mt-3 mb-3">ProVyuh</h5>
                <p className="card-text">
                  15 Aug Independence Day; 30 Aug Raksha Bandhan;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeMainContent;
