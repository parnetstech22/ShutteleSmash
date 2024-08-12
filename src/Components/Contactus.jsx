import React, { useState, useEffect } from "react";
import "../Styles/contact.css";
import { Container } from "react-bootstrap";
import { IoMdMail } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import Aos from "aos";

const Contactus = () => {
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

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPlayerPhone(value);
    setIsPhoneValid(validatePhoneNumber(value));
  };

  // ====================CONTACT US Address, Eamil, Contact==========================//
  //integrating get  method contact us
  const [Addcontactus, setAddcontactus] = useState([]);
  const getAddcontactus = async () => {
    try {
      let res = await axios.get(
        "https://shuttlesmash.shop/api//admin/getcontactus"
      );
      if (res.status === 200) {
        setAddcontactus(res.data.getcontactus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddcontactus();
  }, []);

  // ====================CONTACT US FORM=========================//
  // post method form
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setGUMessage(data);
  };

  const formdata = new FormData();
  const [GUName, setGUName] = useState("");
  const [GUPhone, setGUPhone] = useState("");
  const [GUEmail, setGUEmail] = useState("");
  const [GUMessage, setGUMessage] = useState("");

  const Addgeneralquery = async () => {
    try {
      if (!GUName) {
        return alert("Please add name");
      }
      if (!GUEmail) {
        return alert("Please add email ");
      }
      if (!GUPhone) {
        return alert("Please add phone number");
      }
      if (!GUMessage) {
        return alert("Please add phone number");
      }

      const config = {
        url: "/user/general",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "multipart/form-data" },
        data: {
          GUName: GUName,
          GUPhone: GUPhone,
          GUEmail: GUEmail,
          GUMessage: GUMessage,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getgeneral();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //integrating get  method
  const [Addgeneral, setAddgeneral] = useState([]);
  const getgeneral = async () => {
    try {
      let res = await axios.get(
        "https://shuttlesmash.shop/api//user/getgeneral"
      );
      if (res.status === 200) {
        setAddgeneral(res.data.getgeneral);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getgeneral();
  }, []);
  console.log(Addgeneral);

  // ====================Social Media=========================//
  //integrating get  method
  const [Addsocial, setAddsocial] = useState([]);
  const getAddsocial = async () => {
    try {
      let res = await axios.get(
        "https://shuttlesmash.shop/api//admin/getsocial"
      );
      if (res.status === 200) {
        setAddsocial(res.data.getsocial);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddsocial();
  }, []);
  console.log(Addsocial);

  return (
    <div>
      <div className="position-relative">
        <img src="../Assets/contactbg1.jpg" alt="" className="bg-img R-contactus-bg" />
        <div>
          <h2 className="titlehj R-contactus-title">CONTACT US</h2>
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

      <Container>
        <div className="row mt-3 mb-4 R-contact-form">
          <div className="col-md-6">
            <div
              className="form-container"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="3000"
            >
              <form>
                <h2>Let's Talk</h2>

                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="vi_1 mb-2"
                  onChange={(e) => setGUName(e.target.value)}
                />
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="vi_1 mb-2"
                    style={{ borderColor: isEmailValid ? "" : "red" }} // Optional: Highlight border if invalid
                    onChange={(e) => {
                      setGUEmail(e.target.value); // Updates state with the new email value
                      handleEmailChange(e); // Validates the email
                    }}
                  />
                  {!isEmailValid && (
                    <p style={{ color: "red" }}>
                      Please enter a valid email address.
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="number"
                    id="number"
                    name="number"
                    placeholder="+91 Enter Contact Number"
                    className="vi_1 mb-2"
                    style={{ borderColor: isPhoneValid ? "" : "red" }}
                    onChange={(e) => {
                      setGUPhone(e.target.value); // Updates state with the new email value
                      handlePhoneChange(e); // Validates the email
                    }}
                  />
                  {!isPhoneValid && (
                    <p style={{ color: "red" }}>
                      Please enter a valid 10-digit phone number.
                    </p>
                  )}
                </div>

                <textarea
                  type="text"
                  placeholder="Enter Your Message"
                  className="textarea mb-2"
                  onChange={handleChange}
                />
                <button className="send-button" onClick={Addgeneralquery}>
                  Submit
                </button>
              </form>
            </div>
          </div>

          {Addcontactus?.map((val, i) => {
            return (
              <div className="col-md-5 p-2">
                <div
                  className=" mt-3 mb-3 "
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000"
                >
                  <h3 className="mb-3">Follow us</h3>
                  <div
                    className="contact-info-container-social-icon justify-content-start mb-3"
                    style={{ gap: "8px" }}
                  >
                    {Addsocial?.map((val, i) => {
                      return (
                        <div className="c-icon-section">
                          <a href={val.CLink} target="_new">
                            <img
                              src={`https://shuttlesmash.shop/SocialMedia/${val?.CIcon}`}
                              alt=""
                              style={{
                                width: "45px",
                                height: "45px",
                              }}
                            />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className="d-flex gap-3 mb-3 mt-5 R-contact-loc"
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000"
                >
                  <div>
                    <FaLocationDot style={{ fontSize: "22px" }} />
                  </div>
                  <div>{val.CAddress}</div>
                </div>
                <hr />
                <div
                  className="d-flex gap-3 mb-3"
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000"
                >
                  <div>
                    <IoMdMail style={{ fontSize: "22px" }} />
                  </div>
                  <div> {val.CEmail}</div>
                </div>
                <hr />
                <div
                  className="d-flex gap-3 mb-3"
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000"
                >
                  <div>
                    <BiSolidPhoneCall style={{ fontSize: "22px" }} />
                  </div>
                  <div>+91 {val.CPhone}</div>
                </div>
                <hr />
                {/* <div
                  data-aos="zoom-in"
                  data-aos-delay="50"
                  data-aos-duration="3000"
                >
                  <img
                    src="../Assets/contact.jpg"
                    alt=""
                    style={{ width: "100%" }}
                  />
                </div> */}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Contactus;
