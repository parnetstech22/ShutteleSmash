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

const AdminDoubleResult = () => {
  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // integrating post method
  const [ResultCategory, setResultCategory] = useState("");
  const [ResultSubCategory, setResultSubCategory] = useState("");
  const [FirstPlayername, setFirstPlayername] = useState("");
  const [SecondPlayername, setSecondPlayername] = useState("");
  const [Position, setPosition] = useState("");
  const [Company, setCompany] = useState("");

  const AddDoubleResultdetails = async () => {
    try {
      if (!ResultCategory) {
        return alert("Please add Event Category");
      }

      if (!FirstPlayername) {
        return alert("Please add First Player Name");
      }
      // if (!SecondPlayername) {
      //   return alert("Please add Second Player Name");
      // }
      if (!Position) {
        return alert("Please add Winning Position");
      }

      const config = {
        url: "/admin/results",
        method: "post",
        baseURL: "https://shuttlesmash.shop/api/",
        header: { "content-type": "application/json" },
        data: {
          ResultCategory: ResultCategory,
          ResultSubCategory: ResultSubCategory,
          FirstPlayername: FirstPlayername,
          SecondPlayername: SecondPlayername,
          Position: Position,
          Company: Company,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddDounbleResult();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //integrating get  method
  const [AddDounbleResult, setAddDounbleResult] = useState([]);
  const getAddDounbleResult = async () => {
    try {
      let res = await axios.get("https://shuttlesmash.shop/api//admin/getresults");
      if (res.status === 200) {
        setAddDounbleResult(res.data.getresults);
        setNoChangeData1(res.data.getresults);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete method
  const [Data, setData] = useState("");
  const DeleteDoubleResults = async () => {
    try {
      const config = {
        url: "admin/Deleteresults/" + Data,
        method: "delete",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddDounbleResult();
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
    setResultCategory(item?.ResultCategory);
    setResultSubCategory(item?.ResultSubCategory);
    setFirstPlayername(item?.FirstPlayername);
    setSecondPlayername(item?.SecondPlayername);
    setPosition(item?.Position);
    setCompany(item?.Company);
  };

  const EditDoubleResult = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("ResultCategory", ResultCategory);
    formdata.append("ResultSubCategory", ResultSubCategory);
    formdata.append("FirstPlayername", FirstPlayername);
    formdata.append("SecondPlayername", SecondPlayername);
    formdata.append("Position", Position);
    formdata.append("Company", Company);
    formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "admin/editresults",
        method: "put",
        baseURL: "https://shuttlesmash.shop/api//",
        header: { "content-type": "multipart/form-data" },
        data: {
          ResultCategory: ResultCategory,
          ResultSubCategory: ResultSubCategory,
          FirstPlayername: FirstPlayername,
          SecondPlayername: SecondPlayername,
          Position: Position,
          Company: Company,
        },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose3();
          getAddDounbleResult();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    getAddDounbleResult();
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
      setAddDounbleResult(filteredData1);
    } else {
      setAddDounbleResult(nochangedata1);
    }
  };

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

  return (
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
        <h2 className="header-c ">Results</h2>
        <button className="admin-add-btn" onClick={handleShow}>
          Add Results
        </button>
      </div>

      <div className="mb-3">
        <Table responsive bordered style={{ width: "-webkit-fill-available" }}>
          <thead>
            <tr>
              <th>SL.NO</th>
              <th>Category</th>
              <th>Player Name 1</th>
              <th>Player Name 2</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records?.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1 + firstIndex}</td>
                  <td style={{ paddingTop: "20px" }}>{item.ResultCategory}</td>

                  <td style={{ paddingTop: "20px" }}>{item.FirstPlayername}</td>
                  <td style={{ paddingTop: "20px" }}>
                    {item.SecondPlayername}
                  </td>
                  <td style={{ paddingTop: "20px" }}>{item.Position}</td>
                  <td>
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        justifyContent: "center",
                      }}
                    >
                      {/* <div>
              <BiSolidEdit
                className="text-success"
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={() => handleShow3(item)}
              />{" "}
            </div> */}
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

      {/* Add Double Result modal */}
      <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>
            Add Result Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <div className="row">
                  <div className="do-sear mt-2">
                    <label>Select Category</label>

                    <select
                      style={{ padding: "8px", borderRadius: "5px" }}
                      className="form-control"
                      onChange={(e) => setResultCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {AddCategory?.map((item, i) => {
                        return (
                          <option value={item.CategoryName}>
                            {item.CategoryName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div> 

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add First Player Name </label>
              <input
                type="text"
                className="vi_0"
                placeholder="Enter First Player Name"
                onChange={(e) => setFirstPlayername(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Second Player Name </label>
              <input
                type="text"
                className="vi_0"
                placeholder="Enter First Player Name"
                onChange={(e) => setSecondPlayername(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Position</label>
              <select
                className="vi_0"
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="">Select Position</option>
                <option value="Winner">Winner</option>
                <option value="Runner">Runner</option>
                <option value="Runner">Semi-Finalist</option>
              </select>
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
              onClick={AddDoubleResultdetails}
            >
              Add
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Delet signle  */}
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
          <Button
            variant=""
            className="modal-add-btn"
            onClick={DeleteDoubleResults}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDoubleResult;
