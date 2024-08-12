import React, { useState, useEffect } from "react";
import "../Styles/results.css";
import { Container, Button, Table } from "react-bootstrap";
import axios from "axios";
import Aos from "aos";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Results = () => {
  useEffect(() => {
    Aos.init();
    window.scroll(0, 0);
  });

  const [Achiver, setAchiver] = useState(false);
  const [All, setAll] = useState(true);

  // ===============SINGLE RESULT==================//
  //integrating get  method
  const [AddSingleResult, setAddSingleResult] = useState([]);
  const getAddSingleResult = async () => {
    try {
      let res = await axios.get(
        "https://shuttlesmash.shop/api//admin/getsingleresults"
      );
      if (res.status === 200) {
        setAddSingleResult(res.data.getsingleresults);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAddSingleResult();
  }, []);

  // ===============DOUBLE RESULT==================//
  //integrating get  method
  const [AddDounbleResult, setAddDounbleResult] = useState([]);
  const getAddDounbleResult = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getresults");
      if (res.status === 200) {
        setAddDounbleResult(res.data.getresults);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAddDounbleResult();
  }, []);

  // ===============ACHIVERS==================//
  //integrating get  method
  const [AddAchivers, setAddAchivers] = useState([]);
  const getAddAchivers = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getachivers");
      if (res.status === 200) {
        setAddAchivers(res.data.getachivers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddAchivers();
  }, []);

  // pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = AddDounbleResult.slice(firstIndex, lastIndex);
  const npages = Math.ceil(AddDounbleResult.length / recordsperpage);
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

  return (
    <div>
      <div>
        <img src="../Assets/resultbg.jpg" alt="" className="bg-img" />
        <div>
          <h2 className="btitle">RESULTS</h2>
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
        {/* <div
          className="row mt-3 mb-4"
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="3000"
        >
          <div>
            <h2 className="headdings">Previous Events Results</h2>
          </div>
          <div>
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Player Name</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {AddSingleResult?.map((val, i) => {
                  return (
                    <tr>
                      <td>{val.SResultCategory}</td>
                      <td>{val.SPlayername}</td>
                      <td>{val.SPosition}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div> */}

        <div
          className="row mt-3 mb-4"
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="3000"
        >
          <div>
            <h2 className="headdings">Previous Event Results</h2>
          </div>
          <div className="overflow-y-scroll">
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>SL.NO</th>
                  <th>Category</th>
                  <th>First Player Name</th>
                  <th>Second Player Name</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {AddDounbleResult?.map((val, i) => {
                  return (
                    <tr>
                      <td>{i + 1 + firstIndex}</td>
                      <td>{val.ResultCategory}</td>
                      <td>{val.FirstPlayername}</td>
                      <td>{val.SecondPlayername}</td>
                      <td>{val.Position}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="row mt-3 mb-4 d-flex justify-content-center">
          <div>
            <h2 className="headdings">Our Achivers</h2>
          </div>
          <div className="mb-2 ">
            <a
              href="/gallery"
              style={{ color: "unset", textDecoration: "none" }}
            >
              <span className="viewmoreevnt" style={{ float: "right" }}>
                View More{" "}
                <span>
                  <FaArrowAltCircleRight
                    className="shake"
                    style={{ fontSize: "20px" }}
                  />
                </span>
              </span>
            </a>
          </div>
          <div className="row">
            {AddAchivers?.map((val, i) => {
              return (
                <div className="col-md-4 p-0">
                  <div className="mt-3 " >
                    <img
                      src={`https://shuttlesmash.shop/Achivers/${val?.AchiversImage}`}
                      alt=""
                      className="achivers-img"
                    />
                  </div>
                  <div className="achivers-name">{val.AchiversText}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Results;
