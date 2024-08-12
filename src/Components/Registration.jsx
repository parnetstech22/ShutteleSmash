import React, { useState, useEffect } from "react";
import "../Styles/events.css";
import { Container, Button, Modal } from "react-bootstrap";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const item = JSON.parse(decodeURIComponent(queryParams.get("item")));

  // Email formate Validation
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (value) => {
    // Regex pattern for validating an email address
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  // Phone number validation
  const [PlayerPhone, setPlayerPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const validatePhoneNumber = (number) => {
    // Basic validation: Ensure it's a 10-digit number
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPlayerPhone(value);
    setIsPhoneValid(validatePhoneNumber(value));
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [AddCategory, setAddCategory] = useState([]);
  const getAddCategory = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getcategory");
      if (res.status === 200) {
        setAddCategory(res.data.getcategory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddCategory();
  }, []);

  const [selectedCategories, setSelectedCategories] = useState({
    sum: 0,
    items: [],
    itemsId: [],
  });
  const handleCheckboxChange = (value, checked, item) => {
    setSelectedCategories((prev) => {
      const newSum =
        (prev.sum || 0) + (checked ? Number(value) : -Number(value));
      const newItems = checked
        ? [...prev.items, item]
        : prev.items.filter((i) => i !== item);
      const newItemsId = checked
        ? [...prev.itemsId, { categoryId: item._id }] // Add the item's categoryId as an object
        : prev.itemsId.filter((idObj) => idObj.categoryId !== item._id); // Remove the object by matching the categoryId
      return { sum: newSum, items: newItems, itemsId: newItemsId };
    });
  };

  let subtotal = 0;

  let TotalSelectedCategory = selectedCategories?.items;
  let TotalSelectedCategoryIds = selectedCategories?.itemsId;

  const [PlayerDetailsShow, setPlayerDetailsShow] = useState([]);

  const setStorePlayerDetailscat = (inputIndex, playerName, categoryName) => {
    setPlayerDetailsShow((prevDetails) => {
      // Check if the entry already exists
      const existingIndex = prevDetails.findIndex(
        (detail) => detail.inputIndex === inputIndex
      );
      if (existingIndex > -1) {
        // Update existing entry
        const updatedDetails = [...prevDetails];
        updatedDetails[existingIndex] = {
          inputIndex,
          name: playerName,
          categoryName,
        };
        return updatedDetails;
      } else {
        // Add new entry
        return [...prevDetails, { inputIndex, name: playerName, categoryName }];
      }
    });
  };

  if (TotalSelectedCategory?.length !== 0) {
    for (let i = 0; i < TotalSelectedCategory.length; i++) {
      subtotal += TotalSelectedCategory[i]?.CategoryPrice;
    }
  }

  let Totalnumberfoplayer = selectedCategories.sum;
  let TextfieldArray = Array(Totalnumberfoplayer).fill(Totalnumberfoplayer);

  const [playerNames, setPlayerNames] = useState({});
  const handlePlayerNameChange = (index, name) => {
    setPlayerNames((prev) => ({ ...prev, [index]: name }));
  };

  const navigate = useNavigate();

  const [PlayerEmail, setPlayerEmail] = useState("");
  const [PlayerPhoneNo, setPlayerPhoneNo] = useState("");

  const AddRegisterquery = async () => {
    try {
      const config = {
        url: "/user/registration",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "application/json" },
        data: {
          eventsId: item?._id,
          playerNames: playerNames,
          PlayerEmail: PlayerEmail,
          PlayerPhoneNo: PlayerPhoneNo,
          TotalAmount: subtotal,
          Category: TotalSelectedCategoryIds,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        sendmail();
        handleClose1();
        handleClose();
        setPlayerNames("");
        setPlayerEmail("");
        setPlayerPhoneNo("");
        playerNamesArray.length = 0;
        sessionStorage.removeItem("playerData");
        window.location.reload();
        navigate("/events");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const obj = {
    playerNames: playerNames,
    PlayerEmail: PlayerEmail,
    PlayerPhoneNo: PlayerPhoneNo,
    TotalAmount: subtotal,
    playesdetails: selectedCategories?.items,
    PlayerDetailsShow: PlayerDetailsShow,
  };
  const storesession = () => {
    try {
      if (!PlayerEmail) {
        return alert("Please Enter Email");
      }
      if (!PlayerPhoneNo) {
        return alert("Please Enter Phone Number");
      }
      sessionStorage.setItem("playerData", JSON.stringify(obj));
      handleShow();
    } catch (error) {
      console.error("Error storing session:", error);
    }
  };

  const playerData = JSON.parse(sessionStorage.getItem("playerData"));
  const playerNamesArray = playerData?.playerNames
    ? Object.values(playerData.playerNames)
    : [];

  const sendmail = async () => {
    try {
      const config = {
        url: "/user/sendmail",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "application/json" },
        data: {
          PlayerEmail: playerData?.PlayerEmail,
          playerNames: playerNamesArray,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="d-flex gap-4 mt-2 align-items-center justify-content-center">
        <a href="/events">
          <div className="back-btn">
            <Button>
              <FaArrowLeft /> Back
            </Button>
          </div>
        </a>
        <div>
          <h2 className="headdings mt-3 mb-4 ">
            Shuttele Smash Championship Registration Form
          </h2>
        </div>
      </div>

      <Container>
        <div className="Registration-main-box">
          <div className="Registration-box">
            <div>
              <div className="row">
                <div className="do-sear mt-2">
                  <label>Select Category</label>
                  <div
                    style={{ padding: "8px", borderRadius: "5px" }}
                    className="form-control"
                  >
                    {AddCategory?.map((item, i) => (
                      <div key={i}>
                        <input
                          type="checkbox"
                          id={`Category-${i}`}
                          value={item.TotalPlayers}
                          onChange={(e) => {
                            handleCheckboxChange(
                              e.target.value,
                              e.target.checked,
                              item
                            );
                          }}
                        />{" "}
                        <span htmlFor={`Category-${i}`}>
                          {item.CategoryName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* {TotalSelectedCategory?.map((item1) => {
                return (
                  <>
                    <h3 style={{ textAlign: "center" }}>
                      {item1?.CategoryName}
                    </h3>
                    {TextfieldArray?.filter((ele)=>ele.length === item1.TotalPlayers)?.map((item, i) => {
                      return (
                        <div key={i} className="do-sear mt-2">
                          <label>Player Name {i + 1}</label>
                          <input
                            type="text"
                            id={`Name${i}`}
                            name={`Name${i}`}
                            placeholder="Enter Your Name"
                            className="vi_0"
                            onChange={(e) =>
                              handlePlayerNameChange(i, e.target.value)
                            }
                          />
                        </div>
                      );
                    })}
                  </>
                );
              })} */}
              {TotalSelectedCategory?.map((item1, categoryIndex) => {
                return (
                  <div key={categoryIndex}>
                    <h3 style={{ textAlign: "center" }}>
                      {item1?.CategoryName}
                    </h3>
                    {[...Array(item1.TotalPlayers)].map((_, i) => {
                      const inputIndex = `${categoryIndex}_${i}`;
                      return (
                        <div key={inputIndex} className="do-sear mt-2">
                          {/* <label>Player Name {i + 1}</label> */}
                          {/* {item1?.CategoryName > 1 && <label>Player Name {i + 1}</label>} */}
                          <label>
                            Player Name{" "}
                            {[...Array(item1.TotalPlayers)].length > 1
                              ? i + 1
                              : ""}
                          </label>
                          <input
                            type="text"
                            id={`Name${inputIndex}`}
                            name={`Name${inputIndex}`}
                            placeholder="Enter Your Name"
                            className="vi_0"
                            onChange={(e) => {
                              handlePlayerNameChange(
                                inputIndex,
                                e.target.value
                              );
                              setStorePlayerDetailscat(
                                inputIndex,
                                e.target.value,
                                item1?.CategoryName
                              );
                            }}
                            value={playerNames[inputIndex] || ""}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <div>
                <div className="do-sear mt-2">
                  <label>Player Email ID</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="vi_0"
                    style={{ borderColor: isEmailValid ? "" : "red" }}
                    onChange={(e) => {
                      setPlayerEmail(e.target.value);
                      handleEmailChange(e);
                    }}
                  />
                  {!isEmailValid && (
                    <p style={{ color: "red" }}>
                      Please enter a valid email address.
                    </p>
                  )}
                </div>
                <div className="do-sear mt-2">
                  <label>Contact Number</label>
                  <input
                    type="number"
                    id="number"
                    name="number"
                    placeholder="+91 Enter Contact Number"
                    className="vi_0"
                    style={{ borderColor: isPhoneValid ? "" : "red" }}
                    onChange={(e) => {
                      setPlayerPhoneNo(e.target.value); // Updates state with the new email value
                      handlePhoneChange(e); // Validates the email
                    }}
                  />
                  {!isPhoneValid && (
                    <p style={{ color: "red" }}>
                      Please enter a valid 10-digit phone number.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-3 mb-3">
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={() => {
                  storesession();
                }}
              >
                Proceed Next
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* REGISTERED USER TABLE   */}
      <Modal
        show={show}
        onHide={handleClose}
        style={{ zIndex: "99999" }}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}> </Modal.Title>{" "}
          <div>
            <a href="/registration">
              <div className="back-btn">
                <Button>
                  <FaArrowLeft /> Back
                </Button>
              </div>
            </a>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div
            style={{
              margin: "auto",
              textDecoration: "underline",
              textAlign: "center",
            }}
          >
            <div>
              <h3>
                <b>Registered Players</b>{" "}
              </h3>
            </div>
          </div>
          <div className="row mt-3 mb-2">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>SL.NO</th>
                  <th>Category</th>
                  <th>Player Names</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  PlayerDetailsShow.reduce((acc, item) => {
                    if (!acc[item.categoryName]) {
                      acc[item.categoryName] = [];
                    }
                    acc[item.categoryName].push(item.name);
                    return acc;
                  }, {})
                ).map(([categoryName, playerNames], index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{categoryName}</td>
                    <td>{playerNames.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="row">
              <div className="col-md-12 mb-2">
                <b>Registered Email ID: - </b>{" "}
                <span> {playerData?.PlayerEmail}</span>
              </div>
              <div className="col-md-12 mb-2">
                <b>Registered Phone No: - </b>{" "}
                <span> +91 {playerData?.PlayerPhoneNo}</span>
              </div>
            </div>

            <div className="row mt-3 mb-2">
              <div className="col-md-6">
                <Table striped bordered hover responsive size="sm">
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerData?.playesdetails?.map((item) => {
                      return (
                        <tr>
                          <td>{item?.CategoryName}</td>
                          <td>{item?.CategoryPrice}</td>
                        </tr>
                      );
                    })}

                    <tr>
                      <td>
                        <b>Total</b>
                      </td>
                      <td>
                        <b>{playerData?.TotalAmount}</b>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <Button
              className="mx-2 modal-add-btn"
              variant=""
              onClick={() => {
                handleClose();
                handleShow1();
              }}
            >
              Pay Now
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/*  Payment Modal  */}
      <Modal
        show={show1}
        onHide={handleClose1}
        style={{ zIndex: "99999" }}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}> </Modal.Title>{" "}
          <div style={{ margin: "auto" }}>
            <div>
              <h4>
                <b>Selected Category Entree Fee </b> <br />
                <b
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "2px 5px",
                  }}
                >
                  Rs {playerData?.TotalAmount}
                </b>
              </h4>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-2">
            <div className="">
              <b style={{ color: "green", fontSize: "20px" }}>Note:</b>
            </div>
            <div>
              <div className="mb-2">
                1. After successful payment, please share the screenshot to our
                Whatspp No.{" "}
                <a href="https://wa.link/5s5pya" style={{ fontSize: "14px" }}>
                  +91 8861711005
                </a>
              </div>
              <div className="mb-2">
                2. If You are facing any payment issue please contact us +91
                8861711005
              </div>
            </div>
          </div>
          <div className="col-md-6 m-auto">
            <img src="../Assets/payment.jpg" alt="" style={{ width: "100%" }} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <Button
              className="mx-2 modal-close-btn"
              variant=""
              onClick={handleClose1}
            >
              Cancel
            </Button>
            <Button
              className="mx-2 modal-add-btn"
              variant=""
              onClick={AddRegisterquery}
            >
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Registration;
