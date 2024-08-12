import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import parse from "html-react-parser";
import { IoEye } from "react-icons/io5";

const AdminEvents = () => {
  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // EVENTS BANNER add
  const [show5, setShow5] = useState();
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  // EVENTS BANNER edit
  const [show6, setShow6] = useState();

  // Condition for tabs
  const [Event, setEvent] = useState(true);
  const [Eventbanner, setEventbanner] = useState(false);
  const [Terms, setTerms] = useState(false);
  const [Brochures, setBrochures] = useState(false);

  // integrating post method
  const formdata = new FormData();
  const [EventImage, setEventImage] = useState("");
  const [EventName, setEventName] = useState("");
  const [EventCategory, setEventCategory] = useState("");
  const [EventStartdate, setEventStartdate] = useState("");
  const [EventEnddate, setEventEnddate] = useState("");
  const [EventLocation, setEventLocation] = useState("");
  const [EventExhibits, setEventExhibits] = useState("");
  const [Price, setPrice] = useState("");
  const [Time, setTime] = useState("");

  const AddEventDetails = async () => {
    formdata.append("EventImage", EventImage);
    formdata.append("EventName", EventName);
    formdata.append("EventCategory", EventCategory);
    formdata.append("EventStartdate", EventStartdate);
    formdata.append("EventEnddate", EventEnddate);
    formdata.append("EventLocation", EventLocation);
    formdata.append("EventExhibits", EventExhibits);
    formdata.append("Price", Price);
    formdata.append("Time", Time);

    try {
      if (!EventImage) {
        return alert("Please add Image");
      }
      if (!EventName) {
        return alert("Please add Event Name");
      }
      // if (!EventCategory) {
      //   return alert("Please add Event Category");
      // }

      if (!EventStartdate) {
        return alert("Please add Event Start Date");
      }
      if (!EventEnddate) {
        return alert("Please add Event End Date");
      }
      if (!Time) {
        return alert("Please select Time");
      }
      if (!EventLocation) {
        return alert("Please add Event Location");
      }

      if (!EventExhibits) {
        return alert("Please add Event Exhibits");
      }

      // if (!Price) {
      //   return alert("Please select price");
      // }
      const config = {
        url: "/admin/events",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddEvents();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
console.log("Time....", Time);

  //integrating get  method
  const [AddEvents, setAddEvents] = useState([]);
  console.log("AddEvents", AddEvents);
  const getAddEvents = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getevents");
      if (res.status === 200) {
        setAddEvents(res.data.getevents);
        setNoChangeData1(res.data.getevents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete method
  const [Data, setData] = useState("");
  const DeleteEvent = async () => {
    try {
      const config = {
        url: "admin/Deleteevents/" + Data,
        method: "delete",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddEvents();
          handleClose4();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //update method
  const [Data1, setData1] = useState("");
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = (item) => {
    setShow3(true);
    setData1(item);
    setEventName(item?.EventName);
    setEventCategory(item?.EventCategory);
    setEventStartdate(item?.EventStartdate);
    setEventEnddate(item?.EventEnddate);
    setEventLocation(item?.EventLocation);
    setEventExhibits(item?.EventExhibits);
    setPrice(item?.Price);
    setTime(item?.Time);


  };

  const EditEvents = async (e) => {
    e.preventDefault();
    formdata.append("EventImage", EventImage);
    formdata.append("EventName", EventName);
    formdata.append("EventCategory", EventCategory);
    formdata.append("EventStartdate", EventStartdate);
    formdata.append("EventEnddate", EventEnddate);
    formdata.append("EventLocation", EventLocation);
    formdata.append("EventExhibits", EventExhibits);
    formdata.append("Price", Price);
    formdata.append("Time", Time);
    formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "admin/editevents",
        method: "put",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose3();
          getAddEvents();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    getAddEvents();
  }, []);

  // pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = AddEvents.slice(firstIndex, lastIndex);
  const npages = Math.ceil(AddEvents.length / recordsperpage);
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

  // Search filter
  const [nochangedata1, setNoChangeData1] = useState([]);
  const [searchH1, setSearchH1] = useState("");

  const handleFilterH = (e) => {
    const searchTerm1 = e.target.value.toLowerCase();
    setSearchH1(searchTerm1);
    if (searchTerm1 !== "") {
      const filteredData1 = nochangedata1.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm1)
        )
      );
      setAddEvents(filteredData1);
    } else {
      setAddEvents(nochangedata1);
    }
  };

  // ==============EVENTS BROCHURES==============================//
  const [View, setView] = useState({});
  const [showFile, setShowFile] = useState();
  const handleCloseFile = () => setShowFile(false);
  const handleShowFile = () => setShowFile(true);

  const [showB, setShowB] = useState();
  const handleCloseB = () => setShowB(false);
  const handleShowB = () => setShowB(true);

  const [showD, setShowD] = useState();
  const handleCloseD = () => setShowD(false);
  const handleShowD = () => setShowD(true);

  const [Brochure, setBrochure] = useState("");

  const AddBrochurefile = async () => {
    const formdata = new FormData();
    formdata.append("Brochure", Brochure);
    try {
      if (!Brochure) {
        return alert("please add Brochure Document");
      }
      const config = {
        url: "/admin/brochures",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddBrochure();
        handleCloseB();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
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

  //delete method EVENTS BANNER
  const [Datad, setDatad] = useState("");
  const DeletBrochure = async () => {
    try {
      const config = {
        url: "admin/Deletebrochures/" + Datad,
        method: "delete",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddBrochure();
          handleCloseD();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {
    getAddBrochure();
  }, []);

  const [currenpage4, setCurrentpage4] = useState(1);
  const recordsperpage4 = 5;
  const lastIndex4 = currenpage4 * recordsperpage4;
  const firstIndex4 = lastIndex4 - recordsperpage4;
  const records4 = AddBrochure.slice(firstIndex4, lastIndex4);
  const npages4 = Math.ceil(AddBrochure.length / recordsperpage4);
  const numbers4 = [...Array(npages + 1).keys()].slice(1);

  function changePage(id) {
    setCurrentpage4(id);
  }

  function prevpage() {
    if (currenpage4 !== firstIndex4) {
      setCurrentpage4(currenpage4 - 1);
    }
  }

  function nextpage() {
    if (currenpage4 !== lastIndex4) {
      setCurrentpage4(currenpage4 + 1);
    }
  }

  // ==============EVENTS BANNER==============================//

  const [EventbannerImage, setEventbannerImage] = useState("");
  const [EventbannerTitle, setEventbannerTitle] = useState("");

  const AddEbannerDetails = async () => {
    const formdata = new FormData();
    formdata.append("EventbannerImage", EventbannerImage);
    formdata.append("EventbannerTitle", EventbannerTitle);
    try {
      if (!EventbannerImage) {
        return alert("please add Image");
      }

      if (!EventbannerTitle) {
        return alert("Please add Title");
      }

      const config = {
        url: "/admin/eventbanner",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddEventbanner();
        handleClose3();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
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

  //delete method EVENTS BANNER
  const [Datas, setDatas] = useState("");
  const DeletEventbannr = async () => {
    try {
      const config = {
        url: "admin/Deleteeventbanner/" + Datas,
        method: "delete",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddEventbanner();
          handleClose5();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //update method EVENTS BANNER
  const [Datass, setDatass] = useState("");
  const handleClose6 = () => setShow6(false);
  const handleShow6 = (item) => {
    setShow6(true);
    setDatass(item);
    setEventbannerTitle(item?.EventbannerTitle);
  };

  const EditEvntbanner = async (e) => {
    e.preventDefault();
    formdata.append("EventbannerImage", EventbannerImage);
    formdata.append("EventbannerTitle", EventbannerTitle);
    formdata.append("id", Datass?._id);
    try {
      const config = {
        url: "admin/editeventbanner",
        method: "put",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose6();
          getAddEventbanner();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  // };
  useEffect(() => {
    getAddEventbanner();
  }, []);

  const [currenpage1, setCurrentpage1] = useState(1);
  const recordsperpage1 = 5;
  const lastIndex1 = currenpage * recordsperpage;
  const firstIndex1 = lastIndex - recordsperpage;
  const records1 = AddEventbanner.slice(firstIndex, lastIndex);
  const npages1 = Math.ceil(AddEventbanner.length / recordsperpage);
  const numbers1 = [...Array(npages + 1).keys()].slice(1);

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

  // ==============TERMS & CONDITION==============================//

  const [Eligibility, setEligibility] = useState("");

  const handleChange1 = (e, editor) => {
    const data = editor.getData();
    setEligibility(data);
  };

  const [showT, setShowT] = useState();
  const handleCloseT = () => setShowT(false);
  const handleShowT = () => setShowT(true);

  const AddTermsDetails = async () => {
    const formdata = new FormData();
    formdata.append("Eligibility", Eligibility);
    try {
      if (!Eligibility) {
        return alert("Please add Description");
      }

      const config = {
        url: "/admin/terms",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddTerms();
        handleCloseT();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
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

  //delete method TERMS & CONDITION
  const [showtt, setShowtt] = useState();
  const handleClosett = () => setShowtt(false);
  const handleShowtt = () => setShowtt(true);

  const [DataT, setDataT] = useState("");
  const DeletTerms = async () => {
    try {
      const config = {
        url: "admin/Deleteterms/" + DataT,
        method: "delete",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddTerms();
          handleClosett();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //update method TERMS & CONDITION
  const [DataTt, setDataTt] = useState("");
  const [Showedit, setShowedit] = useState("");
  const handleCloseedit = () => setShowedit(false);
  const handleShowedit = (item) => {
    setShowedit(true);
    setDataTt(item);
    setEligibility(item?.Eligibility);
  };

  const EditTerms = async (e) => {
    e.preventDefault();
    formdata.append("Eligibility", Eligibility);
    formdata.append("id", DataTt?._id);
    try {
      const config = {
        url: "admin/editterms",
        method: "put",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleCloseedit();
          getAddTerms();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  // };
  useEffect(() => {
    getAddTerms();
  }, []);

  const [currenpage2, setCurrentpage2] = useState(1);
  const recordsperpage2 = 5;
  const lastIndex2 = currenpage2 * recordsperpage2;
  const firstIndex2 = lastIndex2 - recordsperpage2;
  const records2 = AddTerms.slice(firstIndex2, lastIndex2);
  const npages2 = Math.ceil(AddTerms.length / recordsperpage2);
  const numbers2 = [...Array(npages + 1).keys()].slice(1);

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

  // ==============EVENTS Category==============================//

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

  // ==============EVENTS Sub Category==============================//

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

  // DATE & MONTH FORMATE
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { day: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  function convertTo12HourFormat(timeString) {
    // Split the time string into hours and minutes
    let [hours, minutes] = timeString.split(':');
    
    // Convert the string hours to a number
    hours = parseInt(hours);
  
    // Determine AM or PM suffix
    const suffix = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // Convert '0' to '12'
  
    // Return the formatted time string
    return `${hours}:${minutes} ${suffix}`;
  }

  // Selected Checkboxs
  const handleCheckboxChange = (value, isChecked) => {
    if (isChecked) {
      setEventCategory([...EventCategory, value]);
    } else {
      setEventCategory(
        EventCategory.filter((EventCategory) => EventCategory !== value)
      );
    }
  };
  return (
    <div>
      <div className="d-flex gap-3 mb-3">
        <Button
          onClick={() => {
            setEvent(true);
            setEventbanner(false);
            setTerms(false);
            setBrochures(false);
          }}
        >
          Events
        </Button>
        <Button
          onClick={() => {
            setEvent(false);
            setBrochures(true);
            setEventbanner(false);
            setTerms(false);
          }}
        >
          Brochures
        </Button>
        <Button
          onClick={() => {
            setEvent(false);
            setEventbanner(false);
            setTerms(true);
            setBrochures(false);
          }}
        >
          Terms & Condition
        </Button>
        <Button
          onClick={() => {
            setEvent(false);
            setEventbanner(true);
            setTerms(false);
            setBrochures(false);
          }}
        >
          Coming Soon Banner
        </Button>
      </div>

      {/* ======================EVENTS======================== */}
      {Event ? (
        <>
          <div>
            <div className="col-lg-4 d-flex justify-content-center">
              <div class="input-group ">
                <span class="input-group-text" id="basic-addon1">
                  <BsSearch />
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                  aria-describedby="basic-addon1"
                  onChange={handleFilterH}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <h2 className="header-c ">Events</h2>
              <button className="admin-add-btn" onClick={handleShow}>
                Add Events
              </button>
            </div>

            <div className="mb-3">
              <Table
                responsive
                bordered
                style={{ width: "-webkit-fill-available" }}
              >
                <thead>
                  <tr>
                    <th>SL.NO</th>
                    <th>Image</th>
                    <th>Event Name</th>
                    {/* <th>Category</th> */}
                    {/* <th>Category</th> */}
                    {/* <th>Price</th> */}
                    <th>Event Start</th>
                    <th>Event End</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Exhibits</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1 + firstIndex}</td>
                        <td>
                          <Image
                            src={`https://shuttlesmash.shop/Events/${item?.EventImage}`}
                            alt="pic"
                            style={{ width: "75px", height: "75px" }}
                          />
                        </td>{" "}
                        <td style={{ paddingTop: "20px" }}>{item.EventName}</td>
                        {/* <td style={{ paddingTop: "20px" }}>
                          {item.EventCategory}
                        </td> */}
                        {/* <td style={{ paddingTop: "20px" }}>
                          {item.Price}
                        </td> */}
                        <td style={{ paddingTop: "20px" }}>
                          {formatDate(item.EventStartdate)}
                        </td>
                        <td style={{ paddingTop: "20px" }}>
                          {formatDate(item.EventEnddate)}{" "}
                        </td>
                        <td style={{ paddingTop: "20px" }}>
                          {convertTo12HourFormat(item.Time)}{" "}
                        </td>
                        <td style={{ paddingTop: "20px" }}>
                          {item.EventLocation}
                        </td>
                        <td style={{ paddingTop: "20px" }}>
                        {item.EventExhibits}
                        </td>{" "}
                        {/* <td style={{ paddingTop: "20px" }}>{item.Price}</td> */}
                        <td>
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                              justifyContent: "center",
                            }}
                          >
                            <div>
                              <BiSolidEdit
                                className="text-success"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => handleShow3(item)}
                              />{" "}
                            </div>
                            <div>
                              <AiFillDelete
                                className="text-danger"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => {
                                  handleShow4();
                                  setData(item?._id);
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            {/* Add Package modal */}
            <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Add Event Details
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Event Image</label>
                    <input
                      type="file"
                      className="vi_0"
                      placeholder="Enter Banner Title"
                      onChange={(e) => setEventImage(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Event Name</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Event Name"
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </div>
                </div>

                {/* <div className="row">
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
                            value={item.CategoryName}
                            onChange={(e) =>
                              handleCheckboxChange(
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />{" "}
                          <span htmlFor={`Category-${i}`}>
                            {item.CategoryName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div> */}

                {/* <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Price</label>

                    <select
                      style={{ padding: "8px", borderRadius: "5px" }}
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {AddCategory?.map((item, i) => {
                        return (
                          <option value={item.CategoryPrice}>
                            {item.CategoryPrice}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div> */}

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Event Start Date</label>
                    <input
                      type="date"
                      className="vi_0"
                      placeholder="Enter Event Start Date"
                      onChange={(e) => setEventStartdate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Event End Date</label>
                    <input
                      type="date"
                      className="vi_0"
                      placeholder="Enter Event End Date"
                      onChange={(e) => setEventEnddate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Event Time</label>
                    <input
                      type="time"
                      className="vi_0"
                      placeholder="Enter Event Time"
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Event Location</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Event Location"
                      onChange={(e) => setEventLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Event Organizer </label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Event Organizer"
                      onChange={(e) => setEventExhibits(e.target.value)}
                    />
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
                    Close
                  </Button>
                  <Button
                    className="mx-2 modal-add-btn"
                    variant=""
                    onClick={AddEventDetails}
                  >
                    Add
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>

            {/* Edit Package modal */}
            <Modal
              show={show3}
              onHide={handleClose3}
              backdrop="static"
              keyboard={false}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Edit Event Details
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Image</label>
                    <input
                      type="file"
                      className="vi_0"
                      onChange={(e) => setEventImage(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Event Name</label>
                    <input
                      type="text"
                      className="vi_0"
                      value={EventName}
                      placeholder="Enter Event Name"
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </div>
                </div>

                {/* <div className="row">
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
                            value={item.CategoryName}
                            onChange={(e) =>
                              handleCheckboxChange(
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />{" "}
                          <span htmlFor={`Category-${i}`}>
                            {item.CategoryName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Price</label>

                    <select
                      style={{ padding: "8px", borderRadius: "5px" }}
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {AddCategory?.map((item, i) => {
                        return (
                          <option value={item.CategoryPrice}>
                            {item.CategoryPrice}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div> */}

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Event Start Date</label>
                    <input
                      type="date"
                      className="vi_0"
                      value={EventStartdate}
                      onChange={(e) => setEventStartdate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Event End Date</label>
                    <input
                      type="date"
                      className="vi_0"
                      value={EventEnddate}
                      onChange={(e) => setEventEnddate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Event Time</label>
                    <input
                      type="time"
                      className="vi_0"
                      value={Time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Event Location</label>
                    <input
                      type="text"
                      className="vi_0"
                      value={EventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Event Organizer </label>
                    <input
                      type="text"
                      className="vi_0"
                      value={EventExhibits}
                      onChange={(e) => setEventExhibits(e.target.value)}
                    />
                  </div>
                </div>


                {/* <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Price</label>
                    <input
                      type="number"
                      className="vi_0"
                      value={Price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div> */}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant=""
                  className="modal-close-btn"
                  onClick={handleClose3}
                >
                  Close
                </Button>
                <Button
                  variant=""
                  className="modal-add-btn"
                  onClick={EditEvents}
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Delet modal  */}
            <Modal
              show={show4}
              onHide={handleClose4}
              backdrop="static"
              keyboard={false}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-12">
                    <p className="fs-4" style={{ color: "red" }}>
                      Are you sure?
                      <br /> you want to delete this data?
                    </p>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant=""
                  className="modal-close-btn"
                  onClick={handleClose4}
                >
                  Close
                </Button>
                <Button
                  variant=""
                  className="modal-add-btn"
                  onClick={DeleteEvent}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          <div>
            <nav>
              <ul className="pagination">
                <li className="not-allow">
                  <span>
                    <li className="next-prev">
                      <a
                        onClick={() => {
                          prevpage();
                        }}
                      >
                        &lt;
                      </a>{" "}
                    </li>
                  </span>
                </li>
                {numbers?.map((n, i) => {
                  return (
                    <li className="active-next" key={i}>
                      <a
                        href="#"
                        className="inactive"
                        onClick={() => changePage(n)}
                      >
                        {n}
                      </a>
                    </li>
                  );
                })}

                <li className="not-allow">
                  <span>
                    <li
                      className="next-prev"
                      onClick={() => {
                        nextpage();
                      }}
                    >
                      &gt;{" "}
                    </li>
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </>
      ) : (
        <></>
      )}

      {/* ==============EVENT BROCHURES==================== */}

      {Brochures ? (
        <>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="header-c ">Event Brochures</h2>

              <div>
                {AddBrochure?.length !== 0 ? (
                  ""
                ) : (
                  <>
                    <button className="admin-add-btn" onClick={handleShowB}>
                      Add Brochures
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mb-3">
              <Table
                responsive
                bordered
                style={{ width: "-webkit-fill-available" }}
              >
                <thead>
                  <tr>
                    <th>Documents</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records4?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td style={{ paddingTop: "20px" }}>
                          <IoEye
                            style={{ fontSize: "20px", color: "#004aad" }}
                            onClick={() => {
                              handleShowFile();
                              setView(item);
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                              justifyContent: "center",
                            }}
                          >
                            <div>
                              <AiFillDelete
                                className="text-danger"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => {
                                  handleShowD();
                                  setDatad(item?._id);
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            {/* Add Brochures modal */}
            <Modal
              show={showB}
              onHide={handleCloseB}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Add Brochures
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Event Brochures</label>
                    <input
                      type="file"
                      className="vi_0"
                      onChange={(e) => setBrochure(e.target.files[0])}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex">
                  <Button
                    className="mx-2 modal-close-btn"
                    variant=""
                    onClick={handleCloseB}
                  >
                    Close
                  </Button>
                  <Button
                    className="mx-2 modal-add-btn"
                    variant=""
                    onClick={AddBrochurefile}
                  >
                    Add
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>

            {/* Delet event banner modal  */}
            <Modal
              show={showD}
              onHide={handleCloseD}
              backdrop="static"
              keyboard={false}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-12">
                    <p className="fs-4" style={{ color: "red" }}>
                      Are you sure?
                      <br /> you want to delete this data?
                    </p>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant=""
                  className="modal-close-btn"
                  onClick={handleCloseD}
                >
                  Close
                </Button>
                <Button
                  variant=""
                  className="modal-add-btn"
                  onClick={DeletBrochure}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

            {/* View Brochure Documents modal */}
            <Modal
              show={showFile}
              onHide={handleCloseFile}
              backdrop="static"
              keyboard={false}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Event Brochures
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-12">
                    <iframe
                      src={`https://shuttlesmash.shop/Events/${View?.Brochure}`}
                      style={{ width: "100%", height: "500px" }}
                      title={`Brochure `}
                    ></iframe>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant=""
                  className="modal-close-btn"
                  onClick={handleCloseFile}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      ) : (
        <></>
      )}

      {/* ==============TERMS & CONDITION==================== */}

      {Terms ? (
        <>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="header-c ">Terms & Condition</h2>

              <div>
                {AddTerms?.length !== 0 ? (
                  ""
                ) : (
                  <>
                    <button className="admin-add-btn" onClick={handleShowT}>
                      Add Terms & Condition
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mb-3">
              <Table
                responsive
                bordered
                style={{ width: "-webkit-fill-available" }}
              >
                <thead>
                  <tr>
                    <th>SL.NO</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records2?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1 + firstIndex}</td>

                        <td style={{ paddingTop: "20px" }}>
                          {parse(`<div>${item.Eligibility}</div>`)}
                        </td>
                        <td>
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                              justifyContent: "center",
                            }}
                          >
                            <div>
                              <BiSolidEdit
                                className="text-success"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => handleShowedit(item)}
                              />{" "}
                            </div>
                            <div>
                              <AiFillDelete
                                className="text-danger"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => {
                                  handleShowtt();
                                  setDataT(item?._id);
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            {/* Add terms modal */}
            <Modal
              show={showT}
              onHide={handleCloseT}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Add Terms & Condition
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Terms & Condition</label>
                    <CKEditor editor={ClassicEditor} onChange={handleChange1} />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex">
                  <Button
                    className="mx-2 modal-close-btn"
                    variant=""
                    onClick={handleCloseT}
                  >
                    Close
                  </Button>
                  <Button
                    className="mx-2 modal-add-btn"
                    variant=""
                    onClick={AddTermsDetails}
                  >
                    Add
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>

            {/* Edit terms modal */}
            <Modal
              show={Showedit}
              onHide={handleCloseedit}
              backdrop="static"
              keyboard={false}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Edit Terms & Condition
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Terms & Condition</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={Eligibility}
                      onChange={handleChange1}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant=""
                  className="modal-close-btn"
                  onClick={handleClose6}
                >
                  Close
                </Button>
                <Button
                  variant=""
                  className="modal-add-btn"
                  onClick={EditTerms}
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Delet terms modal  */}
            <Modal
              show={showtt}
              onHide={handleClosett}
              backdrop="static"
              keyboard={false}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-12">
                    <p className="fs-4" style={{ color: "red" }}>
                      Are you sure?
                      <br /> you want to delete this data?
                    </p>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant=""
                  className="modal-close-btn"
                  onClick={handleClosett}
                >
                  Close
                </Button>
                <Button
                  variant=""
                  className="modal-add-btn"
                  onClick={DeletTerms}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      ) : (
        <></>
      )}

      {/* ==============EVENT BANNER==================== */}

      {Eventbanner ? (
        <>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="header-c ">Upcoming Banner</h2>

              <div>
                {AddEventbanner?.length !== 0 ? (
                  ""
                ) : (
                  <>
                    <button className="admin-add-btn" onClick={handleShow3}>
                      Add Upcoming Banner
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mb-3">
              <Table
                responsive
                bordered
                style={{ width: "-webkit-fill-available" }}
              >
                <thead>
                  <tr>
                    <th>SL.NO</th>
                    <th>Image</th>
                    <th>Text</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records1?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1 + firstIndex}</td>
                        <td>
                          <Image
                            src={`https://shuttlesmash.shop/Events/${item?.EventbannerImage}`}
                            alt="pic"
                            style={{ width: "75px", height: "75px" }}
                          />
                        </td>{" "}
                        <td style={{ paddingTop: "20px" }}>
                          {item.EventbannerTitle}
                        </td>
                        <td>
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                              justifyContent: "center",
                            }}
                          >
                            <div>
                              <BiSolidEdit
                                className="text-success"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => handleShow6(item)}
                              />{" "}
                            </div>
                            <div>
                              <AiFillDelete
                                className="text-danger"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => {
                                  handleShow5();
                                  setDatas(item?._id);
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            {/* Add Event banner modal */}
            <Modal
              show={show3}
              onHide={handleClose3}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Add Upcoming Events Banner
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Upcoming Events Banner Image</label>
                    <input
                      type="file"
                      className="vi_0"
                      onChange={(e) => setEventbannerImage(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Upcoming Events Title</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Upcoming Events Title"
                      onChange={(e) => setEventbannerTitle(e.target.value)}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex">
                  <Button
                    className="mx-2 modal-close-btn"
                    variant=""
                    onClick={handleClose3}
                  >
                    Close
                  </Button>
                  <Button
                    className="mx-2 modal-add-btn"
                    variant=""
                    onClick={AddEbannerDetails}
                  >
                    Add
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>

            {/* Edit event banner modal */}
            <Modal
              show={show6}
              onHide={handleClose6}
              backdrop="static"
              keyboard={false}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Edit Upcoming Events Banner
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Upcoming Events Banner Image</label>
                    <input
                      type="file"
                      className="vi_0"
                      onChange={(e) => setEventbannerImage(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Upcoming Events Title</label>
                    <input
                      type="text"
                      className="vi_0"
                      value={EventbannerTitle}
                      onChange={(e) => setEventbannerTitle(e.target.value)}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant=""
                  className="modal-close-btn"
                  onClick={handleClose6}
                >
                  Close
                </Button>
                <Button
                  variant=""
                  className="modal-add-btn"
                  onClick={EditEvntbanner}
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Delet event banner modal  */}
            <Modal
              show={show5}
              onHide={handleClose5}
              backdrop="static"
              keyboard={false}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-12">
                    <p className="fs-4" style={{ color: "red" }}>
                      Are you sure?
                      <br /> you want to delete this data?
                    </p>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant=""
                  className="modal-close-btn"
                  onClick={handleClose5}
                >
                  Close
                </Button>
                <Button
                  variant=""
                  className="modal-add-btn"
                  onClick={DeletEventbannr}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdminEvents;
