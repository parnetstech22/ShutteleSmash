import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import "../Admin/Admin.css";
import axios from "axios";

const AdminBanner = () => {
  const [show, setShow] = useState();
  const [show4, setShow4] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  // integrating post method
  const formdata = new FormData();
  const [BannerImage, setBannerImage] = useState("");
  const [BannerText, setBannerText] = useState("");
  const [BannerText2, setBannerText2] = useState("");
  const [BannerTagline, setBannerTagline] = useState("");

  const AddBannerdetails = async () => {
    formdata.append("BannerImage", BannerImage);
    formdata.append("BannerText", BannerText);
    formdata.append("BannerText2", BannerText2);
    formdata.append("BannerTagline", BannerTagline);

    try {
      if (!BannerImage) {
        return alert("Please add Image");
      }
      if (!BannerText) {
        return alert("Please add text");
      }
      if (!BannerText2) {
        return alert("Please add text");
      }
      if (!BannerTagline) {
        return alert("Please add tagline");
      }

      const config = {
        url: "/admin/banner",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddBanner();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

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

  //delete method
  const [Data, setData] = useState("");
  const DeleteBanner = async () => {
    try {
      const config = {
        url: "admin/Deletebanner/" + Data,
        method: "delete",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddBanner();
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
    setBannerText(item?.BannerText);
    setBannerText2(item?.BannerText2);
    setBannerTagline(item?.BannerTagline);
  };

  const EditBanner = async (e) => {
    e.preventDefault();
    formdata.append("BannerImage", BannerImage);
    formdata.append("BannerText", BannerText);
    formdata.append("BannerTagline", BannerTagline);
    formdata.append("BannerText2", BannerText2);
    formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "admin/editbanner",
        method: "put",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose3();
          getAddBanner();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    getAddBanner();
  }, []);

  // pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = AddBanner.slice(firstIndex, lastIndex);
  const npages = Math.ceil(AddBanner.length / recordsperpage);
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
    <div className="customerhead p-2">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="header-c ">Home Banner</h2>
        <div>
          {AddBanner?.length !== 0 ? (
            ""
          ) : (
            <>
              <button className="admin-add-btn" onClick={handleShow}>
                Add Banner
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mb-3">
        <Table responsive bordered style={{ width: "-webkit-fill-available" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th>Title</th>
              <th>Sub Title</th>
              <th>Tagline</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records?.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1 + firstIndex}</td>
                  <td>
                    <video width="auto" height="150" autoPlay loop muted>
                      <source
                        src={`https://shuttlesmash.shop/Homebanner/${item?.BannerImage}`}
                        type="video/mp4"
                      />
                    </video>
                  </td>

                  <td style={{ paddingTop: "20px" }}>{item.BannerText}</td>
                  <td style={{ paddingTop: "20px" }}>{item.BannerText2}</td>
                  <td style={{ paddingTop: "20px" }}>{item.BannerTagline}</td>

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
          <Modal.Title style={{ color: "black" }}>Add Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Banner Image</label>
              <input
                type="file"
                name=""
                id=""
                accept=".mp4,.webm"
                className="vi_0"
                onChange={(e) => setBannerImage(e.target.files[0])}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Banner Title</label>
              <input
                type="text"
                className="vi_0"
                placeholder="Enter Banner Title"
                onChange={(e) => setBannerText(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Banner Sub Title</label>
              <input
                type="text"
                className="vi_0"
                placeholder="Enter Banner Title"
                onChange={(e) => setBannerText2(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Banner Tagline</label>
              <input
                type="text"
                className="vi_0"
                placeholder="Enter Banner Title"
                onChange={(e) => setBannerTagline(e.target.value)}
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
              onClick={AddBannerdetails}
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
          <Modal.Title style={{ color: "black" }}>Edit Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="do-sear mt-2">
              <label>Edit Banner Image</label>
              <input
                type="file"
                name=""
                accept=".mp4,.webm"
                className="vi_0"
                onChange={(e) => setBannerImage(e.target.files[0])}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Edit Banner Title</label>
              <input
                type="text"
                className="vi_0"
                value={BannerText}
                placeholder="Enter Banner Title"
                onChange={(e) => setBannerText(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Banner Sub Title</label>
              <input
                type="text"
                className="vi_0"
                value={BannerText2}
                placeholder="Enter Banner Title"
                onChange={(e) => setBannerText2(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Banner Tagline</label>
              <input
                type="text"
                className="vi_0"
                value={BannerTagline}
                placeholder="Enter Banner Title"
                onChange={(e) => setBannerTagline(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="modal-close-btn" onClick={handleClose3}>
            Close
          </Button>
          <Button variant="" className="modal-add-btn" onClick={EditBanner}>
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
          <Button variant="" className="modal-close-btn" onClick={handleClose4}>
            Close
          </Button>
          <Button variant="" className="modal-add-btn" onClick={DeleteBanner}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminBanner;
