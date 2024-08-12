import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../Styles/header.css";
import { Button, Row, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IoMdMail } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [show1, setShow1] = useState(false);

  // ===============TOP HEADER================== //
  //integrating get  method contact us
  const [Addcontactus, setAddcontactus] = useState([]);
  const getAddcontactus = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getcontactus");
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

  return (
    <div
      className="headers"
      style={{
        position: "sticky",
        top: "0px",
        zIndex: "999",
        backgroundColor: "white",
      }}
    >
      {/* Top Nav Start */}
      <div className="top-nav-header">
        <div className="top-nav">
          <div>
            <a href="/">
              <img className="pulse"
                src="../Assets/logo.png"
                alt="logo"
                style={{ width: "350px", height: "7.5rem" }}
              />
            </a>
          </div>
        </div>

        {Addcontactus?.map((val, i) => {
          return (
            <div className="navbar-left-content">
              <div>
                <IoMdMail className="hithere" style={{ fontSize: "20px" }} />{" "}
                {val.CEmail}
              </div>
              <div>
                <BiSolidPhoneCall
                  className="hithere"
                  style={{ fontSize: "22px" }}
                />{" "}
                +91 {val.CPhone}
              </div>

              <div>
                <a
                  href="https://chat.whatsapp.com/JSgotD6mlBZ6XXbMdBWxDW"
                  style={{ color: "unset", textDecoration: "none" }}
                >
                  <Button variant="" className="join-whatsp fade-in-down ">
                    Join Whatsapp Community
                  </Button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
      {/* Top Nav End */}

      {["xl"].map((expand) => (
        <Navbar key={expand} expand={expand} className="navbar">
          <Container fluid>
            <Nav.Link href="/" className="tail-text">
              <a href="/">
                <img
                  src="../Assets/logo.jpg"
                  alt="logo"
                  className="nav-logo-mbl"
                />
              </a>
            </Nav.Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body style={{ padding: "2px 60px" }}>
                <Nav
                  className="justify-content-end flex-grow-1 pe-3"
                  style={{ alignItems: "center" }}
                >
                  <Nav.Link href="/" className="tail-text">
                    HOME
                  </Nav.Link>
                  <NavDropdown
                    onClick={() => navigate("")}
                    className="dropdown"
                    title="WHO WE ARE"
                    id="basic-nav-dropdown"
                    style={{ color: "white" }}
                  >
                    <div className="dropdown nav-link">
                      <div>
                        <NavDropdown.Item href="/overview" className="nav-link">
                          Overview
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          href="/keyhighlights"
                          className="nav-link"
                        >
                          Key Highlights & Mission
                        </NavDropdown.Item>
                      </div>
                    </div>
                  </NavDropdown>
                  <Nav.Link href="/events" className="tail-text">
                    EVENTS
                  </Nav.Link>
                  <Nav.Link href="/gallery" className="tail-text">
                    GALLERY
                  </Nav.Link>
                  <Nav.Link href="/results" className="tail-text">
                    RESULTS
                  </Nav.Link>

                  <Nav.Link href="/contactus" className="tail-text">
                    CONTACT US
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <hr style={{ margin: "0" }} />
    </div>
  );
}

export default Header;
