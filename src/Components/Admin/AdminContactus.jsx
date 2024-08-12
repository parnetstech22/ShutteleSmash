import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";

const AdminContactus = () => {
  const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();
  const [show3, setShow3] = useState(false);
  const [show5, setShow5] = useState();
  const [show4, setShow4] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  // condition variable
  const [social, setSocial] = useState(false);
  const [conat, setConat] = useState(true);

  // post method conactus
  const formdata = new FormData();
  const [CAddress, setCAddress] = useState("");
  const [CPhone, setCPhone] = useState("");
  const [CEmail, setCEmail] = useState("");

  const AddContact = async () => {
    try {
      if (!CAddress) {
        return alert("Please add Address");
      }
      if (!CPhone) {
        return alert("Please add Phone number");
      }
      if (!CEmail) {
        return alert("Please add Email ID");
      }

      const config = {
        url: "/admin/contactus",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "application/Json" },
        data: {
          CAddress: CAddress,
          CPhone: CPhone,
          CEmail: CEmail,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddcontactus();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
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

  //delete method contact us
  const [Data, setData] = useState("");
  const DeleteContact = async () => {
    try {
      const config = {
        url: "admin/Deletecontactus/" + Data,
        method: "delete",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddcontactus();
          handleClose2();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //update method contact us
  const [Data1, setData1] = useState("");
  const handleClose1 = () => setShow1(false);
  const handleShow1 = (item) => {
    setShow1(true);
    setData1(item);
    setCAddress(item?.CAddress);
    setCPhone(item?.CPhone);
    setCEmail(item?.CEmail);
  };

  const editConatct = async (e) => {
    e.preventDefault();
    formdata.append("CAddress", CAddress);
    formdata.append("CPhone", CPhone);
    formdata.append("CEmail", CEmail);
    formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "admin/editcontactus",
        method: "put",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose1();
          getAddcontactus();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  // };
  useEffect(() => {
    getAddcontactus();
  }, []);
  console.log(Addcontactus);

  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = Addcontactus.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Addcontactus.length / recordsperpage);
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

  // social media
  const [CLink, setCLink] = useState("");
  const [CIcon, setCIcon] = useState("");

  const AddSocialmedia = async () => {
    formdata.append("CLink", CLink);
    formdata.append("CIcon", CIcon);
    try {
      if (!CIcon) {
        return alert("please add Icon/Image");
      }

      if (!CLink) {
        return alert("Please add Email ID");
      }

      const config = {
        url: "/admin/social",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddsocial();
        handleClose3();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
  //integrating get  method contact us
  const [Addsocial, setAddsocial] = useState([]);
  const getAddsocial = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getsocial");
      if (res.status === 200) {
        setAddsocial(res.data.getsocial);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete method contact us
  const [Datas, setDatas] = useState("");
  const Deletesocial = async () => {
    try {
      const config = {
        url: "admin/Deletesocial/" + Datas,
        method: "delete",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddsocial();
          handleClose5();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //update method contact us
  const [Datass, setDatass] = useState("");
  const handleClose4 = () => setShow4(false);
  const handleShow4 = (item) => {
    setShow4(true);
    setDatass(item);
    setCLink(item?.CLink);
  };

  const editsocial = async (e) => {
    e.preventDefault();
    formdata.append("CLink", CLink);
    formdata.append("CIcon", CIcon);
    formdata.append("id", Datass?._id);
    try {
      const config = {
        url: "admin/editsocial",
        method: "put",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose4();
          getAddsocial();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  // };
  useEffect(() => {
    getAddsocial();
  }, []);
  console.log(Addsocial);

  const [currenpage1, setCurrentpage1] = useState(1);
  const recordsperpage1 = 5;
  const lastIndex1 = currenpage * recordsperpage;
  const firstIndex1 = lastIndex - recordsperpage;
  const records1 = Addsocial.slice(firstIndex, lastIndex);
  const npages1 = Math.ceil(Addsocial.length / recordsperpage);
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

  return (
    <div>
      <div className="customerhead p-2">
        <div className="d-flex gap-3">
          <button
            className="admin-add-btn"
            onClick={() => {
              setSocial(false);
              setConat(true);
            }}
          >
            Contact us
          </button>
          <button
            className="admin-add-btn"
            onClick={() => {
              setSocial(true);
              setConat(false);
            }}
          >
            Social Media
          </button>
        </div>

        {social ? (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="header-c ">Social Media</h2>
              <div className="d-flex gap-3">
                <button className="admin-add-btn" onClick={handleShow3}>
                  Add Social Media
                </button>
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
                    <th>Link</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records1?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1 + firstIndex1}</td>
                        <td>
                          <Image
                            src={`https://shuttlesmash.shop/SocialMedia/${item?.CIcon}`}
                            alt="pic"
                            style={{ width: "75px", height: "75px" }}
                          />
                        </td>
                        <td style={{ paddingTop: "20px" }}>{item.CLink}</td>
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
                                onClick={() => {
                                  handleShow4(item);
                                }}
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
          </>
        ) : (
          <></>
        )}

        {conat ? (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="header-c ">Contact us</h2>
              <div className="d-flex gap-3">
              <div>
          {Addcontactus?.length !== 0 ? (
            ""
          ) : (
            <>
             <button className="admin-add-btn" onClick={handleShow}>
                  Add Contact us
                </button>
            </>
          )}
        </div>
                
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
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Email ID</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td style={{ paddingTop: "20px" }}>{item.CAddress}</td>
                        <td style={{ paddingTop: "20px" }}>{item.CPhone}</td>
                        <td style={{ paddingTop: "20px" }}>{item.CEmail}</td>
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
                                onClick={() => handleShow1(item)}
                              />{" "}
                            </div>
                            <div>
                              <AiFillDelete
                                className="text-danger"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => {
                                  handleShow2();
                                  setData(item?._id);
                                }}
                              />{" "}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* contact us Add Package modal */}
        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>Add Conatct us</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Address</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter address"
                  onChange={(e) => setCAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Phone Number</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter phone number"
                  onChange={(e) => setCPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add mail ID</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Email id"
                  onChange={(e) => setCEmail(e.target.value)}
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
                onClick={AddContact}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* contact us Edit Package modal */}
        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>Edit Contactus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Address</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Address"
                  value={CAddress}
                  onChange={(e) => setCAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Phone Number</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Phone number"
                  value={CPhone}
                  onChange={(e) => setCPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit mail ID</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Email ID"
                  value={CEmail}
                  onChange={(e) => setCEmail(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose1}
            >
              Close
            </Button>
            <Button variant="" className="modal-add-btn" onClick={editConatct}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* contact us Delet modal  */}
        <Modal
          show={show2}
          onHide={handleClose2}
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
              onClick={handleClose2}
            >
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={DeleteContact}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add soacial media Package modal */}
        <Modal show={show3} onHide={handleClose3} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "white" }}>
              Add Social Media
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Banner Image</label>
                <input
                  type="file"
                  name=""
                  className="vi_0"
                  onChange={(e) => setCIcon(e.target.files[0])}
                />
              </div>

              <div className="do-sear mt-2">
                <label>Add Link</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter address"
                  onChange={(e) => setCLink(e.target.value)}
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
                onClick={AddSocialmedia}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit social media Package modal */}
        <Modal
          show={show4}
          onHide={handleClose4}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              Edit Social Media
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Banner Image</label>
                <input
                  type="file"
                  name=""
                  className="vi_0"
                  onChange={(e) => setCIcon(e.target.files[0])}
                />
              </div>

              <div className="do-sear mt-2">
                <label>Add Link</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter address"
                  value={CLink}
                  onChange={(e) => setCLink(e.target.value)}
                />
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
            <Button variant="" className="modal-add-btn" onClick={editsocial}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* social media Delet modal  */}
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
              onClick={handleShow5}
            >
              Close
            </Button>
            <Button variant="" className="modal-add-btn" onClick={Deletesocial}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AdminContactus;
