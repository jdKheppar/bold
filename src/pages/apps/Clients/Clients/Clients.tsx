import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Modal, Table } from "react-bootstrap";
import classNames from "classnames";
import { withSwal } from "react-sweetalert2";



// dummy data
import { sellers } from "./data";
import PageTitle from "../../../../components/PageTitle";



interface TableRecords {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
}

// dummy records
const records: TableRecords[] = [
  { id: 1, firstName: "Mark", lastName: "Otto", userName: "@mdo" },
  { id: 2, firstName: "Jacob", lastName: "Thornton", userName: "@fat" },
  { id: 3, firstName: "Dave", lastName: "G", userName: "@dave" },
  { id: 4, firstName: "Nik", lastName: "N", userName: "@nikn" },
  { id: 5, firstName: "Shreyu", lastName: "Navadiya", userName: "@sn" },
];


const ResponsiveTable = withSwal((props: any) => {
  const { swal } = props;
  return (
    <Card>
      <Card.Body>
        <h4 className="header-title">Client Details</h4>
        <p className="text-muted font-14 mb-4">
          Across every breakpoint, use <code>responsive</code> attribute to
          create responsive tables
        </p>

        <Table className="mb-0" responsive>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(records || []).map((record, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{record.id}</th>
                  <td>{record.firstName}</td>
                  <td>{record.lastName}</td>
                  <td>{record.userName}</td>
                  <td>
                    <i
                      className="bi bi-trash ms-2 cursor-pointer"
                      id="sa-warning"
                      onClick={() =>
                        swal
                          .fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#28bb4b",
                            cancelButtonColor: "#f34e4e",
                            confirmButtonText: "Yes, delete it!",
                          })
                          .then(function (result: { value: any }) {
                            if (result.value) {
                              swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                              );
                            }
                          })
                      }
                    >

                    </i>
                    <i className="bi bi-pencil-square ms-2 cursor-pointer"></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
});


/* name column render */
const NameColumn = ({ row }: { row: any }) => {
  return (
    <>
      <div className="table-user">
        <img src={row.original.image} alt="" className="me-2 rounded-circle" />
        <Link to="#" className="text-body fw-semibold">
          {row.original.name}
        </Link>
      </div>
    </>
  );
};

/* ratings column render */
const RatingsColumn = ({ row }: { row: any }) => {
  const variant =
    row.original.ratings >= 3.0 && row.original.ratings <= 5.0
      ? "text-warning"
      : "text-danger";
  return (
    <>
      <i className={classNames("mdi", "mdi-star", variant)}></i>{" "}
      {row.original.ratings}
    </>
  );
};

/* action column render */
const ActionColumn = () => {
  return (
    <>
      <Link to="#" className="action-icon">
        {" "}
        <i className="mdi mdi-square-edit-outline"></i>
      </Link>
      <Link to="#" className="action-icon">
        {" "}
        <i className="mdi mdi-delete"></i>
      </Link>
    </>
  );
};

// get all columns
const columns = [
  {
    Header: "Name",
    accessor: "name",
    sort: true,
    Cell: NameColumn,
  },
  {
    Header: "Address",
    accessor: "store",
    sort: true,
  },

  {
    Header: "Contact",
    accessor: "products",
    sort: true,
  },
  {
    Header: "Email",
    accessor: "balance",
    sort: true,
  },

  {
    Header: "Action",
    accessor: "action",
    sort: false,
    Cell: ActionColumn,
  },
];

// get pagelist to display
const sizePerPageList = [
  {
    text: "10",
    value: 10,
  },
  {
    text: "25",
    value: 25,
  },
  {
    text: "All",
    value: sellers.length,
  },
];

// main component
const Clients = () => {
  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
  const toggleResponsiveModal = () => {
    setResponsiveModal(!responsiveModal);
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Clients", path: "/apps/clients" },
          { label: "Clients", path: "/apps/clients", active: true },
        ]}
        title={"Clients"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>

                <Col sm={12}>
                  <div className="button-list">
                    <Button
                      variant="danger"
                      className="mb-2"
                      onClick={toggleResponsiveModal}
                    >
                      <i className="mdi mdi-plus-circle me-2"></i> Add Client
                    </Button>

                  </div>

                  <Modal show={responsiveModal} onHide={toggleResponsiveModal}>
                    <Modal.Header closeButton>
                      <h4 className="modal-title">Add Client Information</h4>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="field-1" className="form-label">
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="field-1"
                              placeholder="John"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="field-2" className="form-label">
                              Email
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="field-2"
                              placeholder="john@doe.com"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="">
                            <label htmlFor="field-7" className="form-label">
                              Contact
                            </label>
                            <input
                              className="form-control"
                              id="field-7"
                              placeholder="Enter contact"
                              required
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="field-3" className="form-label">
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="field-3"
                              placeholder="Address"
                              required
                            />
                          </div>
                        </div>
                      </div>


                    </Modal.Body>

                    <Modal.Footer>
                      <button
                        type="button"
                        className="btn btn-secondary waves-effect"
                        onClick={toggleResponsiveModal}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-info waves-effect waves-light"
                      >
                        Save changes
                      </button>
                    </Modal.Footer>
                  </Modal>
                </Col>


              </Row>

              <ResponsiveTable />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Clients;
