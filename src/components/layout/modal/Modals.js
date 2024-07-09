import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./Modals.module.css";
import { Dropdown } from "react-bootstrap";
import swal from "sweetalert";
import { url } from "../../services/Services";
function Modals({ show, handleClose }) {
 
  
  const [abc, setAbc] = useState([]);
  const [select, setSelected] = useState("");
 

  const [info, setInfo] = useState({
    subject: "",
    description: "",
    priority: "",
  });

  const selectHandler = (e) => {
    setSelected(e.target.value);
    // console.log(select);
  };

  const onchangeHandler = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    // console.log(info.category, info.subject, info.description, info.priority);
  };

  //attch file
  const [file, setFile] = useState([]);
  const inputFile = useRef(null);

  const handleChange = (e) => {
    setFile([...file, e.target.files[0]]);
  };

  //validations
  const [categoryError, setCategoryError] = useState({
    validate: true,
    message: "",
  });

  const [subjectError, setSubjectError] = useState({
    validate: true,
    message: "",
  });

  const [descriptionError, setDescriptionError] = useState({
    validate: true,
    message: "",
  });

  const handleCategoryBlur = (e) => {
    if (e.target.value === "") {
      setCategoryError({
        validate: true,
        message: "**PLease Enter Category",
      });
    }
  };

  const handleCategoryFocus = () => {
    setCategoryError(false);
  };

  const handleSubjectBlur = (e) => {
    if (e.target.value === "") {
      setSubjectError({
        validate: true,
        message: "**PLease Enter Subject",
      });
    }
  };

  const handleSubjectFocus = () => {
    setSubjectError(false);
  };

  const handleDescriptionBlur = (e) => {
    if (e.target.value === "") {
      setDescriptionError({
        validate: true,
        message: "**PLease Enter Description",
      });
    }
  };

  const handleDescriptionFocus = () => {
    setDescriptionError(false);
  };

  //validation function
  const validate = () => {
    let isValid = true;
    if (!select) {
      setCategoryError({ validate: true, message: "**Please Select Category" });
    }

    if (!info.subject) {
      setSubjectError({ validate: true, message: "**Please Enter Subject" });
      isValid = false;
    }

    if (!info.description) {
      setDescriptionError({
        validate: true,
        message: "**Please Enter Description",
      });
      isValid = false;
    }
    return isValid;
  };

  //get Category data
  const categoryData = async () => {
    const usertoken = localStorage.getItem("usertoken");
    let result = await fetch(
      `${url}/view/category`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${usertoken}`,
          "ngrok-skip-browser-warning": true,
          "Content-type": "application/json",
        },
      }
    );

    result = await result.json();

    setAbc(result.result);
  
  };
  // console.log(abc);

  useEffect(() => {
    categoryData();
  }, []);

  //store new request data
  const requestsubmitHandler = async (e) => {
    const usertoken = localStorage.getItem("usertoken");
    e.preventDefault();
    // e.currentTarget.disabled=true;
    if (validate()) {
      let result = await fetch(
        `${url}/user/create-ticket`,
        {
          method: "POST",

          body: JSON.stringify({
            categoryId: select,
            subject: info.subject,
            description: info.description,
            priority: info.priority,
          }),
          headers: {
            Authorization: `Bearer ${usertoken}`,
            "Content-type": "application/json",
          },
        }
      );
     
      result = await result.json();
 
      if (result.status == 200) {
        setInfo({
         
          subject: "",
          description: "",
          priority: "",
        }); 
       
        alert("Ticket Created Successfully");
       
      
      } else {
        swal("Oops!", "Please Enter Valid Data", "error");
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className={`${styles.modaldiv}`}>
        <Modal.Header closeButton>
          <Modal.Title>New Request</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${styles.modalbody}`}>
          <form
            onSubmit={requestsubmitHandler}
            style={{ width: "470px", height: "500px" }}
          >
            <div className={`form-group d-flex m-2 w-100 ${styles.inputdiv}`}>
              <div className="w-75">
                <label htmlFor="category">Category</label>
                <select
                  className="form-control p-3"
                  onChange={selectHandler}
                  value={select}
                  onBlur={handleCategoryBlur}
                  onFocus={handleCategoryFocus}
                >
                  {abc.map((value) => {
                    return (
                     
                      <option
                        value={value.category_name}
                        key={value.category_id}
                      >
                        {value.category_name}
                      </option>
                    );
                  })}
                </select>


                {categoryError.validate && (
                  <p className={`text-danger text-start ${styles.error}`}>
                    {categoryError.message}
                  </p>
                )}
              </div>
              <div className={`${styles.details}`}>
                {abc.map((value) => {
                  return (
                    <p
                      value={info.category}
                      key={value.category_id}
                      className={`${styles.selectapprovalname}`}
                    >
                      {select == value.category_name ? (
                        <p className={`${styles.approvalname}`}>
                          {value.approval_name}
                        </p>
                      ) : (
                        ""
                      )}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className={`form-group m-2 ${styles.inputdiv}`}>
              <label htmlFor="subject">Subject</label>
              <span style={{ color: "red" }}>&#42;</span>
              <input
                type="text"
                className="form-control p-3"
                id="subject"
                name="subject"
                placeholder="Subject Line..."
                value={info.subject}
                onChange={onchangeHandler}
                onBlur={handleSubjectBlur}
                onFocus={handleSubjectFocus}
              />
              {subjectError.validate && (
                <p className={`text-danger text-start ${styles.error}`}>
                  {subjectError.message}
                </p>
              )}
            </div>

            <div className={`form-group m-2 ${styles.inputdiv}`}>
              <label htmlFor="description">Description</label>
              <span style={{ color: "red" }}>&#42;</span>
              <input
                type="text"
                className="form-control p-3"
                id="description"
                name="description"
                placeholder="Write Here"
                value={info.description}
                onChange={onchangeHandler}
                onBlur={handleDescriptionBlur}
                onFocus={handleDescriptionFocus}
              />
              {descriptionError.validate && (
                <p className={`text-danger text-start ${styles.error}`}>
                  {descriptionError.message}
                </p>
              )}
            </div>

            <div className="form-group m-2">
              <button
                onClick={() => inputFile.current.click()}
                className={`${styles.filebutton}`}
              >
                <span className="material-symbols-sharp">attach_file</span>
              </button>
              <input type="file" onChange={handleChange} ref={inputFile} />
              <strong>Uploaded Files:</strong>{" "}
              {file.map((x) => x.name).join(", ")}
            </div>

            <div className="form-group d-flex justify-content-between m-2 p-2">
              <div className={`${styles.addpeople}`}>
                <span
                  className="material-symbols-sharp"
                  data-bs-toggle="dropdown"
                >
                  add_circle
                </span>

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Rahul Jain <br />
                      Rahul@gmail.com
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Raj Jain <br />
                      Raj@gmail.com
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Rishi Jain <br />
                      Rishi@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className={`${styles.prioritydropdown}`}>
                <label htmlFor="priority" className={`${styles.priority}`}>
                  Priority
                </label>
                <select
                  name="priority"
                  id="priority"
                  className="form-control p-3 mx-4"
                  onChange={onchangeHandler}
                  value={info.priority}
                >
                  <option value="high">high</option>
                  <option value="medium">medium</option>
                  <option value="low">low</option>
                </select>
              </div>
            </div>

            <div className="form-group d-flex justify-content-center ">
              <input
                variant="primary"
                type="submit"
                className="btn btn-info mx-3"
                value="Submit"
              />

              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Modals;
