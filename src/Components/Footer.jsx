import React, { useState, useEffect } from "react";
import "../Styles/footer.css";
import { IoMdMail } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdChevronRight } from "react-icons/md";
import { Container } from "react-bootstrap";
import axios from "axios";

const Footer = () => {
  // ===============FOOTER ================== //
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
      {/* <div className="footer">
        {Addcontactus?.map((val, i) => {
          return (
            <div className="col-1 kjdhg">
              <img
                src="../Assets/logo.png"
                alt="logo"
                className="footer-logo"
              />
              <div className="footer-description">
                <p>{val.CAddress}</p>
              </div>
            </div>
          );
        })}

        <div className="col-3 kjdhg">
          <h3>Quick Links</h3>
          <ul className="quick">
            <li>
              <span>
                <MdChevronRight style={{ color: "white", fontSize: "20px" }} />
              </span>
              <a href="/overview"> Overview</a>
            </li>
            <li>
              <span>
                <MdChevronRight style={{ color: "white", fontSize: "20px" }} />
              </span>
              <a href="/keyhighlights"> Key Highlights</a>
            </li>
            <li>
              <span>
                <MdChevronRight style={{ color: "white", fontSize: "20px" }} />
              </span>
              <a href="/events"> Events</a>
            </li>
            <li>
              <span>
                <MdChevronRight style={{ color: "white", fontSize: "20px" }} />
              </span>
              <a href="/results"> Results</a>
            </li>
            <li>
              <span>
                <MdChevronRight style={{ color: "white", fontSize: "20px" }} />
              </span>
              <a href="/gallery"> Gallery</a>
            </li>
          </ul>
        </div>

        {Addcontactus?.map((val, i) => {
          return (
            <div className="col-4 kjdhg">
              <h3>Contact Us</h3>
              <ul className="quick">
                <li>
                  <span>
                    <IoMdMail style={{ color: "white", fontSize: "20px" }} />
                  </span>
                  <a
                    href="#"
                    style={{ color: "unset", textDecoration: "none" }}
                  >
                    {" "}
                    &nbsp; {val.CEmail}{" "}
                  </a>
                </li>
                <li>
                  <span>
                    <BiSolidPhoneCall
                      style={{ color: "white", fontSize: "20px" }}
                    />
                  </span>
                  <a
                    href="#"
                    style={{ color: "unset", textDecoration: "none" }}
                  >
                    {" "}
                    &nbsp; +91 {val.CPhone}
                  </a>
                </li>
                <li>
                  <div className="social-icon mt-2 " style={{ gap: "5px" }}>
                    {Addsocial?.map((val, i) => {
                      return (
                        <div className="icon-section">
                          <a href={val.CLink} target="_new">
                            <img
                              src={`https://shuttlesmash.shop/SocialMedia/${val?.CIcon}`}
                              alt=""
                              style={{
                                width: "40px",
                                height: "37px",
                                padding: "3px",
                              }}
                            />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
      </div> */}

      <div className="footer-section">
        <Container>
          <div className="row mt-4 mb-3 R-footer-m">
            <div className="col-md-4 mt-3 mb-3 R-footer-m">
              <div>
                <img
                  src="../Assets/logo.png"
                  alt="logo"
                  className="footer-logo"
                />
              </div>
            </div>

            <div className="col-md-4 mt-3 mb-3 R-footer-m">
              <div className="quick">
                <h4 className="footer-title">Quick Link</h4>
                <ul>
                  <li>
                    <span>
                      <MdChevronRight
                        style={{ color: "white", fontSize: "20px" }}
                      />
                    </span>
                    <a href="/overview"> Overview</a>
                  </li>
                  <li>
                    <span>
                      <MdChevronRight
                        style={{ color: "white", fontSize: "20px" }}
                      />
                    </span>
                    <a href="/keyhighlights"> Key Highlights</a>
                  </li>
                  <li>
                    <span>
                      <MdChevronRight
                        style={{ color: "white", fontSize: "20px" }}
                      />
                    </span>
                    <a href="/events"> Events</a>
                  </li>
                  <li>
                    <span>
                      <MdChevronRight
                        style={{ color: "white", fontSize: "20px" }}
                      />
                    </span>
                    <a href="/results"> Results</a>
                  </li>
                  <li>
                    <span>
                      <MdChevronRight
                        style={{ color: "white", fontSize: "20px" }}
                      />
                    </span>
                    <a href="/gallery"> Gallery</a>
                  </li>
                </ul>
              </div>
            </div>

            {Addcontactus?.map((val, i) => {
              return (
                <div className="col-md-4 mt-3 mb-3 R-footer-m">
                  <div className="quick">
                    <h4 className="footer-title">Contact Us</h4>
                    <ul className="quick">
                      <li>
                        <div className="d-flex gap-2 mb-2">
                          <div>
                            <span>
                              <IoMdMail
                                style={{ color: "white", fontSize: "20px" }}
                              />
                            </span>
                          </div>
                          <div style={{ color: "white" }}>{val.CEmail}</div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex gap-2 mb-3">
                          <div>
                            <span>
                              <BiSolidPhoneCall
                                style={{ color: "white", fontSize: "20px" }}
                              />
                            </span>
                          </div>
                          <div style={{ color: "white" }}>+91 {val.CPhone}</div>
                        </div>
                      </li>
                      <li>
                        <div
                          className="social-icon mt-2 "
                          style={{ gap: "12px" }}
                        >
                          {Addsocial?.map((val, i) => {
                            return (
                              <div className="icon-section">
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
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
