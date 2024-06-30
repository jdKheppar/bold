import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import axios from "axios";

import { withSwal } from "react-sweetalert2";
import PageTitle from "../../../../components/PageTitle";
import Table from "../../../../components/Table";

import React, { useEffect, useState } from "react";

import { ClientDTO } from "../../../../DTOs/ClientDTO";
import { CountriesDTO } from "../../../../DTOs/CountriesDTO";
import { Typeahead } from "react-bootstrap-typeahead";

// Reusable ClientForm Component
interface ClientFormProps {
  client: ClientDTO;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  modalType: "Add" | "Edit";
  closeModal: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
  client,
  handleInputChange,
  handleSubmit,
  modalType,
  closeModal,
}) => {

  const [countries, setCountries] = useState<CountriesDTO[]>([]);
  const [states, setStates] = useState<CountriesDTO[]>([]);
  const [cities, setCities] = useState<CountriesDTO[]>([]);
  const [countrySelections, setCountrySelections] = useState<CountriesDTO[]>([]);
  const [stateSelections, setStateSelections] = useState<CountriesDTO[]>([]);
  const [citySelections, setCitySelections] = useState<CountriesDTO[]>([]);



  const onChangeCountrySelection = (selected: CountriesDTO[]) => {
    setCountrySelections(selected);
    if (selected && selected[0]) {
      console.log(selected[0].id);
      client.country = selected[0].id;
      fetchStates(selected[0].id);
    }

  };
  const onChangeStateSelection = (selected: CountriesDTO[]) => {
    setStateSelections(selected);
    if (selected && selected[0]) {
      client.state = selected[0].id;
      fetchCities(selected[0].id);
    }
    else {
      setStates([]);
    }

  };

  const onChangeCitySelection = (selected: CountriesDTO[]) => {
    setCitySelections(selected);
    if (selected && selected[0]) {
      client.city = selected[0].id;
    }
    else {
      setCities([]);
    }

  };

  const fetchCountries = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/countries";
    try {
      const response = await axios.get(fullUrl);
      console.log(response.data);
      setCountries(response.data);
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };
  const fetchStates = async (id: any) => {
    id = Number(id);
    const fullUrl = `https://reseller.whitexdigital.com/api/states/${id}`;
    try {
      const response = await axios.get(fullUrl);
      setStates(response.data);
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };
  const fetchCities = async (id: any) => {
    id = Number(id);
    const fullUrl = `https://reseller.whitexdigital.com/api/cities/${id}`;
    try {
      const response = await axios.get(fullUrl);

      setCities(response.data);
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  // useEffect(() => {
  //   if (selectedStateId) {
  //     fetchCities(selectedStateId);
  //   }
  // }, [selectedStateId]);
  return (
    <>
      <Modal.Header closeButton>
        <h4 className="modal-title">{modalType} Client Information</h4>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="John"
                required
                value={client.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="john@doe.com"
                required
                value={client.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">
                Contact
              </label>
              <input
                type="text"
                className="form-control"
                id="contact"
                placeholder="Enter contact"
                required
                value={client.contact}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Country
              </label>
              <Typeahead
                id="select1"
                labelKey={"name"}
                multiple={false}
                onChange={onChangeCountrySelection}
                options={countries}
                placeholder="Select a country ..."
                selected={countrySelections}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                State
              </label>
              <Typeahead
                id="select2"
                labelKey={"name"}
                multiple={false}
                onChange={onChangeStateSelection}
                options={states}
                placeholder="Select a state..."
                selected={stateSelections}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                City
              </label>
              <Typeahead
                id="select3"
                labelKey={"name"}
                multiple={false}
                onChange={onChangeCitySelection}
                options={cities}
                placeholder="Select a city..."
                selected={citySelections}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Postal Code
              </label>
              <input
                type="number"
                className="form-control"
                id="postal_code"
                placeholder="Postal Code"
                required
                value={client.postal_code}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Address"
                required
                value={client.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary waves-effect" onClick={closeModal}>
          Close
        </button>
        <button
          type="button"
          className="btn btn-info waves-effect waves-light"
          onClick={() => {
            handleSubmit();
            closeModal();
          }}
        >
          Save changes
        </button>
      </Modal.Footer>
    </>
  );
};








// get pagelist to display
const sizePerPageList = [
  {
    text: "10",
    value: 10,
  },
  {
    text: "20",
    value: 20,
  },
  {
    text: "50",
    value: 50,
  },
];

// main component
const Clients = withSwal((props: any) => {

  const { swal } = props;
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientDTO[]>([]);
  const [client, setClient] = useState<ClientDTO>({
    id: 0,
    name: "",
    email: "",
    contact: "",
    address: "",
    country: 0,
    state: 0,
    city: 0,
    postal_code: 0,
  });
  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
  const [editClientModal, setEditClientModal] = useState<boolean>(false);

  const toggleResponsiveModal = () => {
    setResponsiveModal(!responsiveModal);
  };

  const openEditClientModal = (record: ClientDTO) => {
    setClient(record);
    setEditClientModal(true);
  };

  const closeEditClientModal = () => {
    setEditClientModal(false);
    setClient({
      id: 0,
      name: "",
      email: "",
      contact: "",
      address: "",
      country: 0,
      state: 0,
      city: 0,
      postal_code: 0,
    });
  };

  const fetchClients = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/client";
    try {
      const response = await axios.get(fullUrl);
      setClients(response.data.data);
    } catch (error) {
      console.error("API call error:", error);
      swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      });
      throw error;
    }
  };

  const editClient = async () => {
    let newObj = {
      name: client.name,
      email: client.email,
      contact: client.contact,
      address: client.address,
      country: String(client.country),
      state: String(client.state),
      city: String(client.city),
      postal_code: String(client.postal_code)


    };
    const params = new URLSearchParams(newObj).toString();

    const fullUrl = `https://reseller.whitexdigital.com/api/client/${client.id}?${params}`;
    try {
      const response = await axios.put(fullUrl);
      fetchClients();
      closeEditClientModal();
      swal.fire({
        title: "Success!",
        text: "Client updated successfully!",
        icon: "success",
      });
    } catch (error) {
      console.error("API call error:", error);
      swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      });
      throw error;
    }
  };

  const addClient = async () => {
    let newObj = {
      name: client.name,
      email: client.email,
      contact: client.contact,
      address: client.address,
    };
    const params = new URLSearchParams(newObj).toString();

    const fullUrl = `https://reseller.whitexdigital.com/api/client?${params}`;
    try {
      const response = await axios.post(fullUrl);
      closeEditClientModal();
      swal.fire({
        title: "Success!",
        text: "Client added successfully!",
        icon: "success",
      });
      fetchClients();
    } catch (error) {
      console.error("API call error:", error);
      swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      });
      throw error;
    }
  };

  const deleteClient = async (clientID: number) => {
    const fullUrl = `https://reseller.whitexdigital.com/api/client/${clientID}`;

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
      .then(async function (result: { value: any }) {
        if (result.value) {
          try {
            await axios.delete(fullUrl);
            swal.fire("Deleted!", "Client has been deleted.", "success");
            fetchClients();
          } catch (error) {
            console.log(error);
            swal.fire("Oops!", "Something went wrong", "error");
          }
        }
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [id]: value,
    }));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  /* action column render */
  const ActionColumn = ({ row }: { row: any }) => {

    return (
      <>

        <div className="action-icon" onClick={() => openEditClientModal(row.original)}>
          {" "}
          <i className="mdi mdi-square-edit-outline"></i>
        </div>
        <div className="action-icon" onClick={() => deleteClient(row.original.id)}>
          {" "}
          <i className="mdi mdi-delete"></i>
        </div>
      </>
    );
  };
  // get all columns
  const columns = [
    {
      Header: "Client ID",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Contact",
      accessor: "contact",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ActionColumn,
    },
  ];
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Ecommerce", path: "/apps/ecommerce/clients" },
          { label: "Orders", path: "/apps/ecommerce/clients", active: true },
        ]}
        title={"Clients"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col lg={8}>

                </Col>

                <Col lg={4}>
                  <div className="text-lg-end mt-xl-0 mt-2">
                    <Button className="btn btn-danger mb-2 me-2" onClick={toggleResponsiveModal}>
                      <i className="mdi mdi-basket me-1"></i> Add New Client
                    </Button>
                    <Button className="btn btn-light mb-2">Export</Button>
                  </div>


                  <Modal show={responsiveModal} onHide={toggleResponsiveModal}>
                    <ClientForm
                      client={client}
                      handleInputChange={handleInputChange}
                      handleSubmit={addClient}
                      modalType="Add"
                      closeModal={toggleResponsiveModal}
                    />
                  </Modal>
                </Col>
              </Row>

              <Table
                columns={columns}
                data={clients}
                isSearchable={true}
                pageSize={10}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSelectable={false}
                theadClass="table-light"
                searchBoxClass="mb-2"
              />
              <Modal show={editClientModal} onHide={closeEditClientModal}>
                <ClientForm
                  client={client}
                  handleInputChange={handleInputChange}
                  handleSubmit={editClient}
                  modalType="Edit"
                  closeModal={closeEditClientModal}
                />
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});

export default Clients;
