import React, { useState, useEffect } from "react";
import "../Styles/events.css";
import { Container, Button, Modal } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import parse from "html-react-parser";
import Aos from "aos";

const Events = () => {
  useEffect(() => {
    Aos.init();
    window.scroll(0, 0);
  });

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

  //TIME AM PM FORMATE
  function convertTo12HourFormat(timeString) {
    // Split the time string into hours and minutes
    let [hours, minutes] = timeString.split(":");

    // Convert the string hours to a number
    hours = parseInt(hours);

    // Determine AM or PM suffix
    const suffix = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // Convert '0' to '12'

    // Return the formatted time string
    return `${hours}:${minutes} ${suffix}`;
  }

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
  const handleShow1 = () => {
    if (!FirstPlayerName) {
      return alert("Please Choose Player number");
    }
    if (!FirstPlayerEmail) {
      return alert("Please add email");
    }
    if (!FirstPlayerPhone) {
      return alert("Please add contact number");
    }
    // Validation for Second Player (if applicable)
    if (SecondPlayerName && !SecondPlayerEmail) {
      return alert("Please provide the email for the second player");
    }
    if (SecondPlayerName && !SecondPlayerPhone) {
      return alert("Please provide the phone number for the second player");
    }
    setShow1(true);
  };

  const [Default, setDefault] = useState(true);
  const [Single, setSingle] = useState(false);
  const [Double, setDouble] = useState(false);

  const [playerType, setPlayerType] = useState("default");
  const [itemeb, setitemeb] = useState();
  // post method form
  const formdata = new FormData();
  const [Data, setData] = useState("");

  const [EventName, setEventName] = useState("");
  const [EventDate, setEventDate] = useState("");
  const [Category, setCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");

  const [FirstPlayerName, setFirstPlayerName] = useState("");
  const [FirstPlayerEmail, setFirstPlayerEmail] = useState("");
  const [FirstPlayerPhone, setFirstPlayerPhone] = useState("");

  const [SecondPlayerName, setSecondPlayerName] = useState("");
  const [SecondPlayerEmail, setSecondPlayerEmail] = useState("");
  const [SecondPlayerPhone, setSecondPlayerPhone] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");

  const AddRegisterquery = async () => {
    try {
      // if (!GUName) {
      //   return alert("Please add name");
      // }
      // if (!GUEmail) {
      //   return alert("Please add email ");
      // }
      // if (!GUPhone) {
      //   return alert("Please add phone number");
      // }
      // if (!GUMessage) {
      //   return alert("Please add phone number");
      // }

      const config = {
        url: "/user/registration",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "application/json" },
        data: {
          EventName: itemeb?.EventName,
          EventDate: itemeb?.EventStartdate,
          TotalAmount: itemeb?.Price,
          Category: itemeb?.EventCategory,
          SubCategory: itemeb?.EventSubCategory,
          FirstPlayerName: FirstPlayerName,
          FirstPlayerEmail: FirstPlayerEmail,
          FirstPlayerPhone: FirstPlayerPhone,
          SecondPlayerName: SecondPlayerName,
          SecondPlayerEmail: SecondPlayerEmail,
          SecondPlayerPhone: SecondPlayerPhone,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        sendmail();
        getAddregister();
        handleClose();
        handleClose1();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendmail = async () => {
    try {
      const config = {
        url: "/user/sendmail",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "application/json" },
        data: {
          playerType: playerType,
          EventName: itemeb?.EventName,
          EventDate: itemeb?.EventStartdate,
          TotalAmount: itemeb?.Price,
          Category: Category,
          SubCategory: SubCategory,
          FirstPlayerName: FirstPlayerName,
          FirstPlayerEmail: FirstPlayerEmail,
          FirstPlayerPhone: FirstPlayerPhone,
          SecondPlayerName: SecondPlayerName,
          SecondPlayerEmail: SecondPlayerEmail,
          SecondPlayerPhone: SecondPlayerPhone,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //integrating get  method
  const [Addregister, setAddregister] = useState([]);
  const getAddregister = async () => {
    try {
      let res = await axios.get(
        "https://shuttlesmash.shop/api//user/getregistration"
      );
      if (res.status === 200) {
        setAddregister(res.data.getregistration);
        setNoChangeData(res.data.getregistration);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddregister();
  }, []);
  console.log(Addregister);

  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = Addregister.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Addregister.length / recordsperpage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  function changePage(id) {
    setCurrentpage(id);
  }

  function prevpage() {
    if (currenpage !== firstIndex) {
      setCurrentpage(currenpage - 1);
    }
  }

  function nextpage() {
    if (currenpage !== lastIndex) {
      setCurrentpage(currenpage + 1);
    }
  }
  const [AddEvents, setAddEvents] = useState([]);
  const eventname = AddEvents.map((ele) => ele.EventName);
  const getAddEvents = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getevents");
      if (res.status === 200) {
        setAddEvents(res.data.getevents);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAddEvents();
  }, []);

  // Search filter
  const [nochangedata, setNoChangeData] = useState([]);
  const [searchH, setSearchH] = useState("");

  const handleFilterH = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchH(searchTerm);
    if (searchTerm !== "") {
      const filteredData = nochangedata.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
      setAddregister(filteredData);
    } else {
      setAddregister(nochangedata);
    }
  };

  //integrating get  method
  const [newData, setNewdata] = useState({});

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

  const [AddSubcategory, setAddSubcategory] = useState([]);
  const getAddSubcategory = async () => {
    try {
      let res = await axios.get(
        "https://shuttlesmash.shop/api//admin/getsubcategory"
      );
      if (res.status === 200) {
        setAddSubcategory(res.data.getsubcategory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAddSubcategory();
  }, []);

  //integrating get  method EVENTS BANNER
  const [AddEventbanner, setAddEventbanner] = useState([]);
  const getAddEventbanner = async () => {
    try {
      let res = await axios.get(
        "https://shuttlesmash.shop/api//admin/geteventbanner"
      );
      if (res.status === 200) {
        setAddEventbanner(res.data.geteventbanner);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddEventbanner();
  }, []);

  //integrating get  method TERMS & CONDITION
  const [AddTerms, setAddTerms] = useState([]);
  const getAddTerms = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getterms");
      if (res.status === 200) {
        setAddTerms(res.data.getterms);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddTerms();
  }, []);

  // =============== BROCHURE DOWNLOAD================== //

  //integrating get  method EVENTS BANNER
  const [AddBrochure, setAddBrochure] = useState([]);
  const getAddBrochure = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getbrochures");
      if (res.status === 200) {
        setAddBrochure(res.data.getbrochures);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddBrochure();
  }, []);

  // Selected Checkboxs
  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const handleCheckboxChange = (value, checked) => {
  //   setSelectedCategories((prev) => {
  //     if (checked) {
  //       return [...prev, value];
  //     } else {
  //       return prev.filter((item) => item !== value);
  //     }
  //   });
  // };

  const [selectedCategories, setSelectedCategories] = useState({
    sum: 0,
    items: [],
  });

  // const handleCheckboxChange = (value, checked,item) => {
  //   setSelectedCategories((prev) => {
  //     if (checked) {
  //       const newValue = (prev[0] || 0) + Number(value);
  //       return [newValue];
  //     } else {
  //       const newValue = (prev[0] || 0) - Number(value);
  //       return [newValue];
  //     }
  //   });
  // };

  const handleCheckboxChange = (value, checked, item) => {
    setSelectedCategories((prev) => {
      const newSum =
        (prev.sum || 0) + (checked ? Number(value) : -Number(value));
      const newItems = checked
        ? [...prev.items, item]
        : prev.items.filter((i) => i !== item);

      return { sum: newSum, items: newItems };
    });
  };

  let Totalnumberfoplayer = selectedCategories.sum;
  let TextfieldArray = Array(Totalnumberfoplayer).fill(Totalnumberfoplayer);

  console.log("TextfieldArray", TextfieldArray.length);
  console.log("selectedCategoriesssss", selectedCategories);
  const [playerNames, setPlayerNames] = useState({});

  const handlePlayerNameChange = (index, name) => {
    setPlayerNames((prev) => ({ ...prev, [index]: name }));
  };
  console.log("playerNames", playerNames);
  const [PlayerEmail, setPlayerEmail] = useState("");
  const [PlayerPhoneNo, setPlayerPhoneNo] = useState("");
  const registerpalyer = async () => {
    try {
      const config = {
        url: "/user/registration",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "application/json" },
        data: {
          playerNames: playerNames,
          PlayerEmail: PlayerEmail,
          PlayerPhoneNo: PlayerPhoneNo,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <img src="../Assets/eventbg1.jpg" alt="" className="bg-img" />
        <div>
          <h2 className="title6">EVENTS</h2>
        </div>
        <div className="fixed-icon">
          <div>
            <a
              href="https://wa.link/5s5pya"
              target="_new"
              style={{ color: "unset", textDecoration: "none" }}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                viewBox="0,0,256,256"
                width="43px"
                height="43px"
              >
                <g transform="translate(51.2,51.2) scale(0.6,0.6)">
                  <g
                    fill="green "
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                    style={{ mixBlendMode: "normal" }}
                  >
                    <g transform="scale(5.12,5.12)">
                      <path d="M25,2c-12.682,0 -23,10.318 -23,23c0,3.96 1.023,7.854 2.963,11.29l-2.926,10.44c-0.096,0.343 -0.003,0.711 0.245,0.966c0.191,0.197 0.451,0.304 0.718,0.304c0.08,0 0.161,-0.01 0.24,-0.029l10.896,-2.699c3.327,1.786 7.074,2.728 10.864,2.728c12.682,0 23,-10.318 23,-23c0,-12.682 -10.318,-23 -23,-23zM36.57,33.116c-0.492,1.362 -2.852,2.605 -3.986,2.772c-1.018,0.149 -2.306,0.213 -3.72,-0.231c-0.857,-0.27 -1.957,-0.628 -3.366,-1.229c-5.923,-2.526 -9.791,-8.415 -10.087,-8.804c-0.295,-0.389 -2.411,-3.161 -2.411,-6.03c0,-2.869 1.525,-4.28 2.067,-4.864c0.542,-0.584 1.181,-0.73 1.575,-0.73c0.394,0 0.787,0.005 1.132,0.021c0.363,0.018 0.85,-0.137 1.329,1.001c0.492,1.168 1.673,4.037 1.819,4.33c0.148,0.292 0.246,0.633 0.05,1.022c-0.196,0.389 -0.294,0.632 -0.59,0.973c-0.296,0.341 -0.62,0.76 -0.886,1.022c-0.296,0.291 -0.603,0.606 -0.259,1.19c0.344,0.584 1.529,2.493 3.285,4.039c2.255,1.986 4.158,2.602 4.748,2.894c0.59,0.292 0.935,0.243 1.279,-0.146c0.344,-0.39 1.476,-1.703 1.869,-2.286c0.393,-0.583 0.787,-0.487 1.329,-0.292c0.542,0.194 3.445,1.604 4.035,1.896c0.59,0.292 0.984,0.438 1.132,0.681c0.148,0.242 0.148,1.41 -0.344,2.771z"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ==============================EVENT BANNER ============================= */}
      <div>
        {AddEventbanner?.map((val, i) => {
          return (
            <div className="mt-2 mb-3">
              <div>
                <h2 className="title111">{val.EventbannerTitle}</h2>
              </div>

              <img
                src={`https://shuttlesmash.shop/Events/${val?.EventbannerImage}`}
                alt=""
                className="upcomingbanner-img"
              />
            </div>
          );
        })}
      </div>

      <div className="event-content-bg mt-2">
      <Container>
        {AddEvents?.map((item, i) => {
          return (
            <div className="row mt-2 mb-3">
              <div
                className="col-md-3"
                data-aos="zoom-in"
                data-aos-delay="50"
                data-aos-duration="3000"
              >
                <div>
                  <img
                    src={`https://shuttlesmash.shop/Events/${item?.EventImage}`}
                    alt=""
                    className="eventimg"
                  />
                </div>
              </div>

              <div className="col-md-9">
                <div
                  className="events-details "
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000"
                >
                  <div className="event-name">
                    <b>{item.EventName}</b>
                  </div>

                  <div className="details mt-2">
                    <div className="event-detl">
                      <b>Venue</b>
                      <span>: {item.EventLocation}</span>
                    </div>
                    <div className="event-detl">
                      <b>Event Start Date</b>
                      <span>: {item.EventStartdate}</span>
                    </div>
                    <div className="event-detl">
                      <b>Event End Date</b>
                      <span>: {item.EventEnddate}</span>
                    </div>

                    <div className="event-detl">
                      <b>Time</b>
                      <span>: {convertTo12HourFormat(item.Time)}</span>
                    </div>

                    <div className="event-detl">
                      <b>Organizer</b>
                      <span>: {item.EventExhibits}</span>
                    </div>
                  </div>

                  <div className="d-flex gap-3 mt-2">
                    <a
                      href={`/registration?item=${encodeURIComponent(
                        JSON.stringify(item)
                      )}`}
                    >
                      <Button variant="" className="registr-btn">
                        Register
                      </Button>{" "}
                    </a>
                    <div>
                      <a
                        href="https://chat.whatsapp.com/JSgotD6mlBZ6XXbMdBWxDW"
                        style={{ color: "unset", textDecoration: "none" }}
                      >
                        <Button variant="" className="join-whatsp">
                          Join Whatsapp
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Container>
</div>
      {/* DOWNLOAD BROCHURE  */}
      <Container>
        <div>
          {AddBrochure?.map((val, i) => {
            return (
              <div className="brochure-section text-center p-4 mt-4 position-relative">
                <img
                  src="../Assets/badmintonleftsmall.png" // Replace with your actual image path
                  alt="Decorative cross"
                  className="cross-img1"
                />
                <h4 className="mb-3">
                  For More Details About Our Events, Download the Brochure
                </h4>
                <Button
                  variant=""
                  className="brochure-download-btn px-4 py-2"
                  href={`https://shuttlesmash.shop/Events/${val?.Brochure}`}
                  download
                >
                  <i className="fas fa-download me-2"></i>Download Brochure
                </Button>
                <img
                  src="../Assets/badmintonrightsmall.png" // Replace with your actual image path
                  alt="Decorative cross"
                  className="cross-img"
                />
              </div>
            );
          })}
        </div>
      </Container>

      <Container>
        <div>
          {AddTerms?.map((val, i) => {
            return (
              <div className="mt-3 mb-3">
                {parse(`<div>${val.Eligibility}</div>`)}
              </div>
            );
          })}
        </div>
      </Container>

      {/*  Registration Modal  */}
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        style={{ zIndex: "99999" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}></Modal.Title>
        </Modal.Header>
        <h4
          style={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "bold",
            padding: "5px 10px",
            color: "#004aad",
          }}
        >
          {" "}
          Shuttle Smash Championship Registration
        </h4>

        <Modal.Body>
          <div className="row">
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
                      <span htmlFor={`Category-${i}`}>{item.CategoryName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {TextfieldArray?.map((item, i) => {
              return (
                <div key={i} className="do-sear mt-2">
                  <label>Player Name {i + 1}</label>
                  <input
                    type="text"
                    id={`Name${i}`}
                    name={`Name${i}`}
                    placeholder="Enter Your Name"
                    className="vi_0"
                    onChange={(e) => handlePlayerNameChange(i, e.target.value)}
                  />
                </div>
              );
            })}

            <div>
              {/* <div className="do-sear mt-2">
                <label>Player Name</label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  placeholder="Enter Your Name"
                  className="vi_0"
                  onChange={(e) => setFirstPlayerName(e.target.value)}
                />
              </div> */}
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
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <Button
              className="mx-2 modal-close-btn"
              variant=""
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="mx-2 modal-add-btn"
              variant=""
              // onClick={() => {
              //   handleClose();
              //   handleShow1();
              // }}
              onClick={registerpalyer}
            >
              Proceed Next
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
          {AddEvents?.map((val, i) => {
            return (
              <div style={{ margin: "auto", textDecoration: "underline" }}>
                <div>
                  <h4>
                    <b>Pay Rs {val?.Price}</b>{" "}
                  </h4>
                </div>
              </div>
            );
          })}
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="d-flex gap-2">
                <b style={{ fontSize: "18px", color: "green" }}>Note: </b>
                <h6>
                  After successful payment, please share the screenshot here.{" "}
                  <a
                    href="https://chat.whatsapp.com/JSgotD6mlBZ6XXbMdBWxDW"
                    style={{ fontSize: "14px" }}
                  >
                    https://chat.whatsapp.com/JSgotD6mlBZ6XXbMdBWxDW
                  </a>
                </h6>
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

export default Events;
