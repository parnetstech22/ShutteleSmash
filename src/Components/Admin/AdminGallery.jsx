import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import { IoMdEye } from "react-icons/io";

const AdminGallery = () => {
  // image add
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // image delt
  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  // vedio add
  const [show2, setShow2] = useState();
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // vedio delt
  const [show5, setShow5] = useState();
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  // Conditions
  const [Image, setImage] = useState(true);
  const [Video, setVideo] = useState(false);

  // =======================IMAGES==================//
  const [View, setView] = useState({});
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [Image5, setImage5] = useState("");
  const [imageURL2, setimageURL2] = useState("");
  const onImageChange2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setimageURL2(URL.createObjectURL(event.target.files[0]));
    }
  };

  const [galleryImages, setGalleryImages] = useState([]);
  const AddGalleryImage = () => {
    if (!Image5) {
      return alert("Please, Select Image");
    }

    const imageExists = galleryImages.find((img) => img?.imgUrl === Image5);

    if (imageExists) {
      return alert("Image already exists in the gallery.");
    }

    const obj = {
      image: Image5,
      imgUrl: imageURL2,
    };

    setGalleryImages([...galleryImages, obj]);
    setImage5("");
  };
  const removeItem2 = (val) => {
    const updatedGallery = galleryImages.filter((item, index) => index !== val);
    setGalleryImages(updatedGallery);
  };

  // integrating post method
  const formdata = new FormData();
  const [GalleryImage, setGalleryImage] = useState("");
  const [GalleryTitle, setGalleryTitle] = useState("");

  const AddGallerydetails = async () => {
    try {
      const formdatasss = new FormData();
      formdatasss.append("GalleryTitle", GalleryTitle); // Replace with dynamic title if needed

      for (let i = 0; i < galleryImages.length; i++) {
        if (Object.keys(galleryImages[i]).length) {
          formdatasss.append("PlaceImages", galleryImages[i].image); // Note: 'PlaceImages' should match the backend key
        }
      }

      const config = {
        url: "/admin/Addgallery",
        method: "post", // POST for creating new entries
        baseURL: "https://shuttlesmash.shop/api/",
        headers: { "content-type": "multipart/form-data" },
        data: formdatasss,
      };

      let response = await axios(config);
      console.log("Gallery Image Response:", response);

      if (response.status === 200) {
        // Changed to 201 for 'Created' status
        alert("Data added successfully");
        getAddGallery(); // Refresh gallery data if needed
        handleClose(); // Close the modal or form if applicable

        setGalleryImages([]);
      }
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.msg ||
          "Error occurred while adding gallery images"
      );
    }
  };

  //integrating get  method
  const [AddGallery, setAddGallery] = useState([]);
  const getAddGallery = async () => {
    try {
      let res = await axios.get(
        "https://shuttlesmash.shop/api//admin/getgallery"
      );
      if (res.status === 200) {
        setAddGallery(res.data.getgallery);
        setNoChangeData1(res.data.getgallery);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("AddGallery", AddGallery);

  //delete method
  const [Data, setData] = useState("");
  const DeleteGallery = async () => {
    try {
      const config = {
        url: "admin/Deletegallery/" + Data,
        method: "delete",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddGallery();
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
    setGalleryTitle(item?.GalleryTitle);
  };

  const EditGallery = async (e) => {
    e.preventDefault();
    formdata.append("GalleryImage", GalleryImage);
    formdata.append("GalleryTitle", GalleryTitle);
    formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "admin/editgallery",
        method: "put",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose3();
          getAddGallery();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    getAddGallery();
  }, []);

  // pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = AddGallery.slice(firstIndex, lastIndex);
  const npages = Math.ceil(AddGallery.length / recordsperpage);
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
      setAddGallery(filteredData1);
    } else {
      setAddGallery(nochangedata1);
    }
  };

  // ======================GALLERY VIDEO=================//

  // integrating post method
  const [GalleryVedio, setGalleryVedio] = useState("");
  const [GalleryVedioTitle, setGalleryVedioTitle] = useState("");

  const AddGalleryVideodetails = async () => {
    formdata.append("GalleryVedio", GalleryVedio);
    formdata.append("GalleryVedioTitle", GalleryVedioTitle);

    try {
      if (!GalleryVedioTitle) {
        return alert("Please add title");
      }

      if (!GalleryVedio) {
        return alert("Please add video");
      }

      const config = {
        url: "/admin/galleryvedio",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddGalleryvideo();
        handleClose2();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //integrating get  method
  const [AddGalleryvideo, setAddGalleryvideo] = useState([]);
  const getAddGalleryvideo = async () => {
    try {
      let res = await axios.get(
        "https://shuttlesmash.shop/api//admin/getgalleryvedio"
      );
      if (res.status === 200) {
        setAddGalleryvideo(res.data.getgalleryvedio);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete method
  const [Datav, setDatav] = useState("");
  const DeleteVedio = async () => {
    try {
      const config = {
        url: "admin/Deletegalleryvedio/" + Datav,
        method: "delete",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddGalleryvideo();
          handleClose5();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //update method
  const [Datavd, setDatavd] = useState("");
  const [show6, setShow6] = useState(false);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = (item) => {
    setShow6(true);
    setDatavd(item);
    setGalleryVedioTitle(item?.GalleryVedioTitle);
  };

  const EditVedio = async (e) => {
    e.preventDefault();
    formdata.append("GalleryVedio", GalleryVedio);
    formdata.append("GalleryVedioTitle", GalleryVedioTitle);
    formdata.append("id", Datavd?._id);
    try {
      const config = {
        url: "admin/editgalleryvedio",
        method: "put",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          getAddGalleryvideo();
          handleClose6();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    getAddGalleryvideo();
  }, []);

  // pagination
  const [currenpage1, setCurrentpage1] = useState(1);
  const recordsperpage1 = 5;
  const lastIndex1 = currenpage1 * recordsperpage1;
  const firstIndex1 = lastIndex1 - recordsperpage1;
  const records1 = AddGalleryvideo.slice(firstIndex1, lastIndex1);
  const npages1 = Math.ceil(AddGalleryvideo.length / recordsperpage1);
  const numbers1 = [...Array(npages1 + 1).keys()].slice(1);

  function changePage1(id) {
    setCurrentpage1(id);
  }

  function prevpage() {
    if (currenpage1 !== firstIndex1) {
      setCurrentpage1(currenpage1 - 1);
    }
  }

  function nextpage() {
    if (currenpage1 !== lastIndex1) {
      setCurrentpage1(currenpage1 + 1);
    }
  }

  return (
    <div className="customerhead p-2">
      <div className="d-flex gap-3 mb-3">
        <div
          onClick={() => {
            setImage(true);
            setVideo(false);
          }}
        >
          <Button>Images</Button>
        </div>
        <div
          onClick={() => {
            setImage(false);
            setVideo(true);
          }}
        >
          <Button>Videos</Button>
        </div>
      </div>

      {Image ? (
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
              <h2 className="header-c ">Gallery Images</h2>
              <button className="admin-add-btn" onClick={handleShow}>
                Add Gallery Image
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
                    <th>S.No</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1 + firstIndex}</td>
                        <td style={{ paddingTop: "20px" }}>
                          <IoMdEye
                            style={{ fontSize: "22" }}
                            onClick={() => {
                              handleShow1();
                              setView(item);
                            }}
                          />
                        </td>

                        <td style={{ paddingTop: "20px" }}>
                          {item.GalleryTitle}
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
            </div>

            {/* Add Package modal */}
            <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Add Gallery
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Gallery Title</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Gallery text"
                      onChange={(e) => setGalleryTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="do-sear mt-2">
                    <label>Add Place Image</label>
                    <input
                      type="file"
                      name=""
                      id=""
                      multiple
                      className="vi_0"
                      onChange={(e) => {
                        setImage5(e.target.files[0]);
                        onImageChange2(e);
                      }}
                    />
                    <Button
                      className="mx-2 modal-add-btn"
                      variant=""
                      onClick={AddGalleryImage}
                    >
                      Add
                    </Button>
                  </div>

                  <Table bordered className="sdfsd-table-head mt-2">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {galleryImages?.map((item, i) => {
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td>
                              <Image
                                src={item?.imgUrl}
                                alt="pic"
                                style={{ width: "75px", height: "75px" }}
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
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "20px",
                                    }}
                                    onClick={() => {
                                      // setData1(item?._id);
                                      removeItem2(i);
                                      // handleShow8()
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
                    onClick={AddGallerydetails}
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
                  Edit Gallery
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Gallery Title</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Gallery text"
                      value={GalleryTitle}
                      onChange={(e) => setGalleryTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="do-sear mt-2">
                    <label>Add Place Image</label>
                    <input
                      type="file"
                      name=""
                      id=""
                      className="vi_0"
                      onChange={(e) => {
                        setImage5(e.target.files[0]);
                        onImageChange2(e);
                      }}
                    />
                    <Button
                      className="mx-2 modal-add-btn"
                      variant=""
                      // onClick={AddGalleryImage}
                    >
                      Edit
                    </Button>
                  </div>

                  <Table bordered className="sdfsd-table-head mt-2">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {galleryImages?.map((item, i) => {
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td>
                              <Image
                                src={item?.imgUrl}
                                alt="pic"
                                style={{ width: "75px", height: "75px" }}
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
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "20px",
                                    }}
                                    onClick={() => {
                                      // setData1(item?._id);
                                      removeItem2(i);
                                      // handleShow8()
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
                  onClick={EditGallery}
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
                  onClick={DeleteGallery}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

            {/* View Imag modal  */}

            <Modal
              show={show1}
              onHide={handleClose1}
              backdrop="static"
              keyboard={false}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Gallery Images
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Table bordered className="sdfsd-table-head mt-2">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {View?.PlaceImages?.map((items, i) => {
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td>
                              <Image
                                src={`https://shuttlesmash.shop/Gallery/${items?.placepicture}`}
                                alt="pic"
                                style={{ width: "75px", height: "75px" }}
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
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "20px",
                                    }}
                                    onClick={() => {
                                      // setData1(item?._id);
                                      removeItem2(i);
                                      // handleShow8()
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
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant=""
                  className="modal-close-btn"
                  onClick={handleClose1}
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

      {Video ? (
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
              <h2 className="header-c ">Gallery Videos</h2>
              <button className="admin-add-btn" onClick={handleShow2}>
                Add Gallery Video
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
                    <th>S.No</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records1?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1 + firstIndex1}</td>
                        <td style={{ paddingTop: "20px" }}>
                          <video width="auto" height="150" autoPlay loop muted>
                            <source
                              src={`https://shuttlesmash.shop/Gallery/${item?.GalleryVedio}`}
                              type="video/mp4"
                              style={{width:"100px", height:"80px"}}
                            />
                          </video>
                        </td>

                        <td style={{ paddingTop: "20px" }}>
                          {item.GalleryVedioTitle}
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
                                  setDatav(item?._id);
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
            </div>

            {/* Add vedio modal */}
            <Modal
              show={show2}
              onHide={handleClose2}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Add Gallery Videos
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Video Title</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Video Title"
                      onChange={(e) => setGalleryVedioTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="do-sear mt-2">
                    <label>Add Gallery Video</label>
                    <input
                      type="file"
                      name=""
                      id=""
                      accept=".mp4,.webm"
                      className="vi_0"
                      onChange={(e) => setGalleryVedio(e.target.files[0])}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex">
                  <Button
                    className="mx-2 modal-close-btn"
                    variant=""
                    onClick={handleClose2}
                  >
                    Close
                  </Button>
                  <Button
                    className="mx-2 modal-add-btn"
                    variant=""
                    onClick={AddGalleryVideodetails}
                  >
                    Add
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>

            {/* Edit Package modal */}
            <Modal
              show={show6}
              onHide={handleClose6}
              backdrop="static"
              keyboard={false}
              style={{ zIndex: "99999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Edit Gallery Videos
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Video Title</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Video Title"
                      value={GalleryVedioTitle}
                      onChange={(e) => setGalleryVedioTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="do-sear mt-2">
                    <label>Add Gallery Video</label>
                    <input
                      type="file"
                      name=""
                      id=""
                      className="vi_0"
                      onChange={(e) => setGalleryVedio(e.target.value)}
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
                  onClick={EditVedio}
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Delet modal  */}
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
                  onClick={DeleteVedio}
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

export default AdminGallery;
