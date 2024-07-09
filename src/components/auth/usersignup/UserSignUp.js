import React, { useState } from "react";
import styles from "./UserSignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import swal from "sweetalert";
import { url } from "../../services/Services";

const UserSignUp = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    empId: "",
    emailId: "",
    password: "",
    cpassword: "",
  });
  const [pass, setpass] = useState("password");
  const [eye, seteye] = useState(true);
  const [type, settype] = useState(false);

  const [cpass, setcpass] = useState("password");
  const [ceye, setceye] = useState(true);
  const [ctype, setctype] = useState(false);
 
  //usestate for errors
  const [fnameError, setfnameError] = useState({ validate: true, message: "" });
  const [lnameError, setlnameError] = useState({ validate: true, message: "" });
  const [empidError, setempidError] = useState({ validate: true, message: "" });

  const [emailIdError, setemailIdError] = useState({
    validate: true,
    message: "",
  });

  const [passwordError, setpasswordError] = useState({
    validate: true,
    message: "",
  });
  const [cPasswordError, setcPasswordError] = useState({
    validate: true,
    message: "",
  });

  //onchange handler
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //validations
  const validate = () => {
    let isValid = true;
    var regexp = /^([a-zA-Z])*[^\s]\1*$/;
    if (!user.fname) {
      setfnameError({ validate: true, message: "**Please Enter FirstName" });
      isValid = false;
    } else if (!regexp.test(user.fname)) {
      setfnameError({ validate: true, message: "**Spaces is not allowed" });
      isValid = false;
    }

    if (!user.lname) {
      setlnameError({ validate: true, message: "**Please Enter LastName" });
      isValid = false;
    } else if (!regexp.test(user.lname)) {
      setlnameError({ validate: true, message: "**Spaces is not allowed" });
      isValid = false;
    }

    var regExEmpId = /^[a-zA-z0-9]*[^\s]\1*$/;
    if (!user.empId) {
      setempidError({ validate: true, message: "**Please Enter Emp.ID" });

      isValid = false;
    } else if (!regExEmpId.test(user.empId)) {
      setempidError({ validate: true, message: "**Spaces is not allowed" });
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.emailId) {
      setemailIdError({ validate: true, message: "**Please Enter Email ID" });
      isValid = false;
    } else if (!emailRegex.test(user.emailId)) {
      setemailIdError({
        validate: true,
        message: "**Please Enter Correct Email ID",
      });
    }

    var passregEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    if (!user.password) {
      setpasswordError({ validate: true, message: "**Please Enter Password" });
      isValid = false;
    } else if (!passregEx.test(user.password)) {
      setpasswordError({
        validate: true,
        message: "Please Enter Valid Password",
      });
      isValid = false;
    }

    if (!user.cpassword) {
      setcPasswordError({
        validate: true,
        message: "**Please Enter Confirm Password",
      });
      isValid = false;
    } else if (user.password !== user.cpassword) {
      setcPasswordError({ validate: true, message: "**Password should match" });
      isValid = false;
    }

    return isValid;
  };

  const handleFnameBlur = (e) => {
    if (e.target.value === "") {
      setfnameError({
        validate: true,
        message: "**PLease Enter FirstName",
      });
    }
  };

  const handleFnameFocus = () => {
    setfnameError(false);
  };

  const handlelnameBlur = (e) => {
    if (e.target.value === "") {
      setlnameError({
        validate: true,
        message: "**PLease Enter valid LastName",
      });
    }
  };

  const handlelnameFocus = () => {
    setlnameError(false);
  };

  const handleempIdBlur = (e) => {
    if (e.target.value === "") {
      setempidError({
        validate: true,
        message: "**PLease Enter valid EmployeeId",
      });
    }
  };

  const handleempIdFocus = () => {
    setempidError(false);
  };

  const handleEmaiIdBlur = (e) => {
    if (e.target.value === "") {
      setemailIdError({
        validate: true,
        message: "**PLease Enter valid EmailId",
      });
    }
  };

  const handleEmailIdFocus = () => {
    setemailIdError(false);
  };

  const handlePasswordBlur = (e) => {
    if (e.target.value === "") {
      setpasswordError({
        validate: true,
        message: "**PLease Enter valid Password",
      });
    }
  };

  const handlePasswordFocus = () => {
    setpasswordError(false);
  };

  const handleConfirmPasswordBlur = (e) => {
    if (e.target.value === "") {
      setcPasswordError({
        validate: true,
        message: "**PLease Enter valid Confirm Password",
      });
    }
  };

  const handleConfirmPasswordFocus = () => {
    setcPasswordError(false);
  };

  const Eye = () => {
    if (pass == "password") {
      setpass("text");
      seteye(false);
      settype(true);
    } else {
      setpass("password");
      seteye(true);
      settype(false);
    }
  };

  const confirmEye = () => {
    if (cpass == "password") {
      setcpass("text");
      setceye(false);
      setctype(true);
    } else {
      setcpass("password");
      setceye(true);
      setctype(false);
    }
  };

  //form submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    //API Integration

    if (validate()) {
      let result = await fetch(
        `${url}/user/register`,
        {
          method: "POST",

          body: JSON.stringify({
            firstName: user.fname,
            lastName: user.lname,
            employeeId: user.empId,
            email: user.emailId,
            password: user.password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      result = await result.json();
  

      if (result.status == 200) {
        swal("User Register Successfully");
        setUser({
          fname: "",
          lname: "",
          empId: "",
          emailId: "",
          password: "",
          cpassword: "",
        });

        
      } else if (result.status == 400 || result.status == 404) {
        alert("User Already Registered ");
        // setUser({
        //   fname: "",
        //   lname: "",
        //   empId: "",
        //   emailId: "",
        //   password: "",
        //   cpassword: "",
        // });
      }
    }
  };

  return (
    <>
      <div className={`container-fluid ${styles.main_div}`}>
        <Navbar />
        <div
          className={`row w-75 h-50 d-flex justify-content-center align-items-center mx-auto ${styles.sub_div}`}
        >
          <div className={`col-lg-6 ${styles.login_div}`}>
            <div className={`${styles.logo}`}>
              <img
                src="/assets/TA_logo.png"
                alt="logo"
                className={`${styles.image}`}
              />
            </div>

            <div className={` ${styles.second_div}`}>
              <h1 className={`font-weight-bold text-center ${styles.heading}`}>
                User SignUp
              </h1>

              <form
                className={`${styles.registrationForm}`}
                onSubmit={submitHandler}
              >
                <div className={`mx-5 d-flex ${styles.input_div}`}>
                  <div className={`w-50 ${styles.input_div}`}>
                    <label htmlFor="fname" className="form-label">
                      Firstname
                    </label>
                    <span style={{ color: "red" }}>&#42;</span>
                    <input
                      type="text"
                      className="form-control p-3"
                      id="fname"
                      name="fname"
                      placeholder="Enter FirstName"
                      onChange={handleChange}
                      value={user.fname}
                      onBlur={handleFnameBlur}
                      onFocus={handleFnameFocus}
                    />
                    {fnameError.validate && (
                      <p className={`text-danger text-start ${styles.error}`}>
                        {fnameError.message}
                      </p>
                    )}
                  </div>

                  <div className={`w-50 mx-2 ${styles.input_div}`}>
                    <label htmlFor="lname" className="form-label">
                      LastName
                    </label>
                    <span style={{ color: "red" }}>&#42;</span>
                    <input
                      type="text"
                      className="form-control p-3"
                      id="lname"
                      name="lname"
                      placeholder="Enter LastName"
                      onChange={handleChange}
                      value={user.lname}
                      onBlur={handlelnameBlur}
                      onFocus={handlelnameFocus}
                    />
                    {lnameError.validate && (
                      <p className={`text-danger text-start ${styles.error}`}>
                        {lnameError.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className={`mx-5 ${styles.input_div}`}>
                  <label htmlFor="empId" className="form-label">
                    Employee ID
                  </label>
                  <span style={{ color: "red" }}>&#42;</span>
                  <input
                    type="text"
                    className="form-control p-3"
                    id="empId"
                    name="empId"
                    placeholder="Enter Employee ID"
                    onChange={handleChange}
                    value={user.empId}
                    onBlur={handleempIdBlur}
                    onFocus={handleempIdFocus}
                  />
                  {empidError.validate && (
                    <p className={`text-danger text-start ${styles.error}`}>
                      {empidError.message}
                    </p>
                  )}
                </div>

                <div className={`mx-5 ${styles.input_div}`}>
                  <label htmlFor="emailId" className="form-label">
                    Email ID
                  </label>
                  <span style={{ color: "red" }}>&#42;</span>
                  <input
                    type="email"
                    className="form-control p-3"
                    id="emailId"
                    name="emailId"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    value={user.emailId}
                    onBlur={handleEmaiIdBlur}
                    onFocus={handleEmailIdFocus}
                  />
                  {emailIdError.validate && (
                    <p className={`text-danger text-start ${styles.error}`}>
                      {emailIdError.message}
                    </p>
                  )}
                </div>

                <div className={`mx-5 ${styles.input_div}`}>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <span style={{ color: "red" }}>&#42;</span>
                  <div className={`d-flex ${styles.pass_div}`}>
                    <input
                      className="p-3"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      onChange={handleChange}
                      value={user.password}
                      type={pass}
                      onBlur={handlePasswordBlur}
                      onFocus={handlePasswordFocus}
                    />
                    <i
                      onClick={Eye}
                      className={`mt-3 fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </div>
                  {passwordError.validate && (
                    <p className={`text-danger text-start ${styles.error}`}>
                      {passwordError.message}
                    </p>
                  )}
                </div>

                <div className={`mx-5 ${styles.input_div}`}>
                  <label htmlFor="cpassword" className="form-label">
                    Confirm Password
                  </label>
                  <span style={{ color: "red" }}>&#42;</span>
                  <div className={`d-flex ${styles.pass_div}`}>
                    <input
                      className="p-3"
                      id="cpassword"
                      name="cpassword"
                      placeholder="Enter Confirm Password"
                      onChange={handleChange}
                      value={user.cpassword}
                      type={cpass}
                      onBlur={handleConfirmPasswordBlur}
                      onFocus={handleConfirmPasswordFocus}
                    />
                    <i
                      onClick={confirmEye}
                      className={`mt-3 fa ${ceye ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </div>
                  {cPasswordError.validate && (
                    <p className={`text-danger text-start ${styles.error}`}>
                      {cPasswordError.message}
                    </p>
                  )}
                </div>

                <div className="py-1 mx-5">
                  <input
                    type="submit"
                    className={`form-control py-2 my-2 bg-info btn ${styles.signup_button}`}
                    value="SignUp"
                  />
                </div>

                <div className="py-1 mx-5 fw-bold">
                  Already have an account
                  <Link to="/" className="text-decoration-none text-primary">
                    &nbsp;&nbsp;LOGIN NOW
                  </Link>
                </div>
              </form>
            </div>
          </div>

          <div className={`col-lg-6 ${styles.content_div}`}>
            <img src="/assets/TRS.png" alt="image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
