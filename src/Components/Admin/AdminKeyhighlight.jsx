import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import "../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import parse from "html-react-parser";

const AdminKeyhighlight = () => {
  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [show1, setShow1] = useState();
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setKeyhighlightDesc(data);
  };

  // integrating post method
  const formdata = new FormData();
  const [KeyhighlightImage, setKeyhighlightImage] = useState("");
  const [KeyhighlightDesc, setKeyhighlightDesc] = useState("");

  const AddKeyhighlightdetails = async () => {
    formdata.append("KeyhighlightImage", KeyhighlightImage);
    formdata.append("KeyhighlightDesc", KeyhighlightDesc);

    try {
      if (!KeyhighlightImage) {
        return alert("Please add Image");
      }
      if (!KeyhighlightDesc) {
        return alert("Please add Key Highlight Description");
      }

      const config = {
        url: "/admin/keyhighlight",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddKeyhighlight();
        handleClose1();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //integrating get  method
  const [AddKeyhighlight, setAddKeyhighlight] = useState([]);
  const getAddKeyhighlight = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getkeyhighlight");
      if (res.status === 200) {
        setAddKeyhighlight(res.data.getkeyhighlight);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete method
  const [Data, setData] = useState("");
  const DeleteKeyhighlight = async () => {
    try {
      const config = {
        url: "admin/Deletekeyhighlight/" + Data,
        method: "delete",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddKeyhighlight();
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
    setKeyhighlightDesc(item?.KeyhighlightDesc);
  };

  const EditKeyhighlight= async (e) => {
    e.preventDefault();
    formdata.append("KeyhighlightImage", KeyhighlightImage);
    formdata.append("KeyhighlightDesc", KeyhighlightDesc);
    formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "admin/editkeyhighlight",
        method: "put",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose3();
          getAddKeyhighlight();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    getAddKeyhighlight();
  }, []);

  // pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = AddKeyhighlight.slice(firstIndex, lastIndex);
  const npages = Math.ceil(AddKeyhighlight.length / recordsperpage);
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
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="header-c ">Key Highlights</h2>
        <div>
          {AddKeyhighlight?.length !== 0 ? (
            ""
          ) : (
            <>
              <button className="admin-add-btn" onClick={handleShow1}>
                Add Key Highlights
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mb-3">
        <Table responsive bordered style={{ width: "-webkit-fill-available" }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Key Highlights</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records?.map((item, i) => {
              return (
                <tr key={i}>
                  <td style={{ paddingTop: "20px" }}>
                    <Image
                      src={`https://shuttlesmash.shop/WebManagement/${item?.KeyhighlightImage}`}
                      alt="overview"
                      style={{ width: "100px", height: "50px" }}
                    />
                  </td>

                  <td style={{ paddingTop: "20px" }}>
                    {/* <div className="scroller"> */}
                    {parse(`<div>${item.KeyhighlightDesc}</div>`)}
                    {/* </div> */}
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
      </div>

      {/* Add Package modal */}
      <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Add Key Highlights</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Image</label>
              <input
                type="file"
                className="vi_0"
                onChange={(e) => setKeyhighlightImage(e.target.files[0])}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Overview</label>
              <CKEditor editor={ClassicEditor} onChange={handleChange} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <Button
              className="mx-2 modal-close-btn"
              variant=""
              onClick={handleClose1}
            >
              Close
            </Button>
            <Button
              className="mx-2 modal-add-btn"
              variant=""
              onClick={AddKeyhighlightdetails}
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
          <Modal.Title style={{ color: "black" }}>Edit Key Highlights</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Image</label>
              <input
                type="file"
                className="vi_0"
                onChange={(e) => setKeyhighlightImage(e.target.files[0])}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Description</label>
              <CKEditor
                editor={ClassicEditor}
                data={KeyhighlightDesc}
                onChange={handleChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="modal-close-btn" onClick={handleClose3}>
            Close
          </Button>
          <Button variant="" className="modal-add-btn" onClick={EditKeyhighlight}>
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
          <Button variant="" className="modal-add-btn" onClick={DeleteKeyhighlight}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminKeyhighlight;
