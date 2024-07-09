import React, { useState } from "react";
import styles from "./ApprovalSignIn.module.css";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import { url } from "../../services/Services";

const ApprovalSignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
 
  const [pass, setpass] = useState("password");
  const [eye, seteye] = useState(true);
  const [type, settype] = useState(false);



  const [emailIdError, setemailIdError] = useState({
    validate: true,
    message: "",
  });
  const [passwordError, setpasswordError] = useState({
    validate: true,
    message: "",
  });

  //for navigation
  const navigate = useNavigate("");


  //onchange handler
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //email blur and focus handler
  const handleEmailIdBlur = (e) => {
    if (e.target.value === "") {
      setemailIdError({
        validate: true,
        message: "**PLease Enter Valid EmailId",
      });
    }
  };

  const handleEmailFocus = () => {
    setemailIdError(false);
  };

  //password blur and focus handler
  const handlePasswordBlur = (e) => {
    if (e.target.value === "") {
      setpasswordError({
        validate: true,
        message: "**PLease Enter Valid Password",
      });
    }
  };

  const handlePasswordFocus = () => {
    setpasswordError(false);
  };

  //validations
  const validate = () => {
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email) {
      setemailIdError({ validate: true, message: "**Please Enter Email ID" });
      isValid = false;
    } else if (!emailRegex.test(user.email)) {
      setemailIdError({
        validate: true,
        message: "**Please Enter Valid Email ID",
      });
      isValid = false;
    }

    var passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    if (!user.password) {
      setpasswordError({ validate: true, message: "**Please Enter Password" });
      isValid = false;
    } else if (!passwordRegex.test(user.password)) {
      setpasswordError({
        validate: true,
        message: "**Please Enter Valid Password",
      });
      alert(
        "Must contain a minimum of 8 characters with an uppercase, lowercase, number and a special character as mandatory"
      );
      isValid = false;
    }
    return isValid;
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

  //form submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    if (validate()) {
      let result = await fetch(
        `${url}/approval/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
        }
      );
      result = await result.json();

      if (result.status == 200) {
        alert("Login Successfully");
        setUser({
          email: "",
          password: "",
        });
        navigate("/dashboard");
        const token = result.result;
        // console.log(token);
        localStorage.setItem("approvaltoken", token);
      } else {
        alert("Unauthorized Approval");
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
                Approval SignIn
              </h1>

              <form
                className={`${styles.registrationForm}`}
                onSubmit={submitHandler}
              >
                <div className={`mx-5 ${styles.input_div}`}>
                  <label htmlFor="email" className="form-label">
                    Email ID
                  </label>
                  <span style={{ color: "red" }}>&#42;</span>
                  <input
                    type="email"
                    className={`form-control p-3 ${
                      !user.email ? "warning" : ""
                    }`}
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    value={user.email}
                    onBlur={handleEmailIdBlur}
                    onFocus={handleEmailFocus}
                  />

                  {emailIdError.validate && (
                    <p className="text-danger text-start">
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
                    <p className="text-danger text-start">
                      {passwordError.message}
                    </p>
                  )}
                </div>

                <div className="py-1 mx-5">
                  <input
                    type="submit"
                    className={`form-control py-2 my-2 bg-info btn ${styles.signup_button}`}
                    value="SignIn"
                  />
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

export default ApprovalSignIn;
