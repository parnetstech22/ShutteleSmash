import React, { useState, useEffect } from "react";
import "../Styles/home.css";
import bannervedio from "../../src/homebanner1.mp4";
import { IoLogoWhatsapp } from "react-icons/io";
import { Container, Button, Card } from "react-bootstrap";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import parse from "html-react-parser";
import axios from "axios";
import Aos from "aos";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  useEffect(() => {
    Aos.init();
    window.scroll(0, 0);
  });

  // DATE & MONTH FORMATE
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { day: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Type animation Color

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1, // Show 1 item at a time
      slidesToSlide: 1, // Slide 1 item at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const responsive1 = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const responsive2 = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // Corrected to 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // Corrected to 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // Corrected to 1
    },
  };

  // ===============HOME BANNER================== //

  //integrating get  method
  const [AddBanner, setAddBanner] = useState([]);
  const getAddBanner = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getbanner");
      if (res.status === 200) {
        setAddBanner(res.data.getbanner);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAddBanner();
  }, []);

  // ===============HOME EVENTS================== //

  //integrating get  method
  const [AddEvents, setAddEvents] = useState([]);
  console.log("AddEvents", AddEvents);
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

  // ===============HOME SPONSORS================== //

  //integrating get  method
  const [AddPartner, setAddPartner] = useState([]);
  const getAddPartner = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getpartner");
      if (res.status === 200) {
        setAddPartner(res.data.getpartner);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAddPartner();
  }, []);

  // ===============HOME TESTIMONIAL================== //

  //integrating get  method
  const [AddTestimonial, setAddTestimonial] = useState([]);
  const getAddTestimonial = async () => {
    try {
      let res = await axios.get(
        "https://shuttlesmash.shop/api//admin/gettestimonial"
      );
      if (res.status === 200) {
        setAddTestimonial(res.data.gettestimonial);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddTestimonial();
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

  return (
    <div>
      {/* HOME BANNER  */}
      <div>
        {AddBanner?.map((val, i) => {
          return (
            <div className="first-banner-component">
              <video
                // src={bannervedio}
                src={`https://shuttlesmash.shop/Homebanner/${val?.BannerImage}`}
                autoPlay
                loop
                muted
                className="home-banner"
              />

              <div className="caption-display">
                <div
                  data-aos="fade-right"
                  data-aos-delay="50"
                  data-aos-duration="3000"
                >
                  <TypeAnimation
                    className="caption"
                    style={{
                      height: "250px",
                      width: "100%",
                      display: "block",
                      color: "white",
                      textShadow: "2px 2px navy",
                    }}
                    sequence={[
                      val?.BannerText || "Default Text 1", // First text
                      2000,
                      // Duration to display the first text
                      val?.BannerText2 || "Default Text 2", // Second text
                      2000, // Duration to display the second text
                      val?.BannerTagline || "Default Text 3", // Third text
                      2000, // Duration to display the third text
                    ]}
                    speed={200} // Typing speed in ms per character
                    cursor={false}
                    deletionSpeed={false} // No deletion speed (prevents text from being deleted)
                    repeat={Infinity} // Repeat the sequence indefinitely
                    omitDeletionAnimation={true}
                  />
                </div>
              </div>
            </div>
          );
        })}
        {/* fixed icons  */}
        <div className="fixed-icon">
          <a
            href="https://wa.link/5s5pya"
            target="_new"
            style={{ color: "unset", textDecoration: "none" }}
          >
            <div>
              <IoLogoWhatsapp
                style={{ color: "green", fontSize: "40px", padding: "7px" }}
              />
            </div>
          </a>
        </div>
      </div>

           {/* UPCOMING EVENTS  */}
           <div className=" mb-5">
        <Container>
          <div>
            <h2 className="headdings">UPCOMING EVENTS</h2>
          </div>
        </Container>{" "}
        <Container className="">
          <div className="row">
            <Carousel
              responsive={responsive}
              ssr={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              keyBoardControl={true}
              customTransition="all 0.5s ease"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              showDots={true}
              arrows={false}
            >
              {AddEvents?.map((val, i) => (
                <div className="item" key={i}>
                  <a
                    href="/events"
                    style={{ color: "unset", textDecoration: "none" }}
                  >
                    <div className="card events-crd">
                      <Card.Img
                        src={`https://shuttlesmash.shop/Events/${val?.EventImage}`}
                        className="events-crd-img"
                      />
                      <Card.Body>
                        <div className="upcoming-date">
                          {formatDate(val.EventStartdate)}
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h3>
                              <b>{val.EventName}</b>
                            </h3>
                          </div>
                          <div>
                            <Button>
                              View More{" "}
                              <span>
                                <FaArrowAltCircleRight
                                  className="shake"
                                  style={{ fontSize: "20px" }}
                                />
                              </span>
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </div>
                  </a>
                </div>
              ))}
            </Carousel>
          </div>
        </Container>
      </div>


      {/* DOWNLOAD BROCHURE  */}
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

      {/* OUR SPONSORS  */}
      <div className="mt-5 mb-5">
        <Container>
          <div>
            <h2 className="headdings mb-5">OUR CLIENTELE</h2>
          </div>
        </Container>
        <Container
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="3000"
        >
          <Carousel
            responsive={responsive1}
            margin={10}
            autoPlay={true}
            infinite={true}
            autoPlaySpeed={5000}
            transitionDuration={500}
            arrows={false}
            showDots={true}
          >
            {AddPartner?.map((val, i) => {
              return (
                <div className="item">
                  <div className="card sponsor-crd">
                    <a href={val.PartnerLink}>
                      <Card.Img
                        variant="top"
                        src={`https://shuttlesmash.shop/Partners/${val?.PartnerImage}`}
                        className="sponsor-crd-img"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </Container>
      </div>

      {/* TESTIMONIALA  */}
      <div className="mt-5 mb-5">
        <div className="testimonial-bg">
          <div>
            <h2 className="headdings pt-3 mb-4" style={{color:"white"}}>TESTIMONIALS</h2>
          </div>

          <Container
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="3000"
          >
            <Carousel
              responsive={responsive2}
              margin={10}
              autoPlay={true}
              infinite={true}
              autoPlaySpeed={5000}
              transitionDuration={500}
              arrows={false}
              showDots={false}
            >
              {AddTestimonial?.map((val, i) => {
                return (
                  <div className="item" key={i}>
                    <div className="card testimonial-crd">
                      <div className="row">
                        <div>
                          <Container>
                            <div className="d-flex">
                              <FaQuoteLeft style={{ color: "#004aad" }} />
                              <Container>
                                {" "}
                                {parse(`<div>${val.Description}</div>`)}
                              </Container>
                              <FaQuoteRight style={{ color: "#004aad" }} />
                            </div>
                          </Container>
                        </div>
                        <div>
                          <img
                            src="../Assets/lines.png"
                            alt=""
                            className="lines"
                          />
                        </div>

                        <div>{val.Name}</div>
                        <div>{val.Designation}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Home;
