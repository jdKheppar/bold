import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Modal, Table, Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { withSwal } from "react-sweetalert2";

import PageTitle from "../../../../components/PageTitle";
import axios from "axios";
import { ClientDTO } from "../../../../DTOs/ClientDTO";
import { CountriesDTO } from "../../../../DTOs/CountriesDTO";

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
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const handleCountrySelect = (countryId: number) => {
    setSelectedCountryId(countryId);
    client.country = countryId;
    fetchStates(countryId);
  };
  const handleStateSelect = (stateId: number) => {
    setSelectedStateId(stateId);
    client.state = stateId;
    fetchCities(stateId);
  };
  const handleCitySelect = (cityId: number) => {
    setSelectedCityId(cityId);
    client.city = cityId;
  };
  const fetchCountries = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/countries";
    try {
      const response = await axios.get(fullUrl);
      setCountries(response.data.data);
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };
  const fetchStates = async (id: any) => {
    id=Number(id);
    const fullUrl = `https://reseller.whitexdigital.com/states/${id}`;
    try {
      const response = await axios.get(fullUrl);
      setStates(response.data.data);
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };
  const fetchCities = async (id: any) => {
    id=Number(id);
    const fullUrl = `https://reseller.whitexdigital.com/cities/${id}`;
    try {
      const response = await axios.get(fullUrl);
      setCities(response.data.data);
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  useEffect(() => {
    if(selectedStateId){
      fetchCities(selectedStateId);
    }
  }, [selectedStateId]);
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
              <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                  {selectedCountryId
                    ? countries.find((country) => country.id === selectedCountryId)?.name
                    : "Select Country"}{" "}
                  <i className="mdi mdi-chevron-down"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {countries.map((country) => (
                    <Dropdown.Item
                      key={country.id}
                      onClick={() => handleCountrySelect(country.id)}
                    >
                      {country.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                State
              </label>
              <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                  {selectedStateId
                    ? states.find((state) => state.id === selectedStateId)?.name
                    : "Select State"}{" "}
                  <i className="mdi mdi-chevron-down"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {countries.map((state) => (
                    <Dropdown.Item
                      key={state.id}
                      onClick={() => handleStateSelect(state.id)}
                    >
                      {state.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
            <label htmlFor="email" className="form-label">
                City
              </label>
              <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                  {selectedCityId
                    ? cities.find((city) => city.id === selectedCityId)?.name
                    : "Select City"}{" "}
                  <i className="mdi mdi-chevron-down"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {cities.map((city) => (
                    <Dropdown.Item
                      key={city.id}
                      onClick={() => handleCountrySelect(city.id)}
                    >
                      {city.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
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
                id="address"
                placeholder="Address"
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

// Main Clients Component
const Clients = withSwal((props: any) => {
  const { swal } = props;
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
      console.log(response);
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
            swal.fire("Deleted!", "Your file has been deleted.", "success");
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
                    <Button variant="danger" className="mb-2" onClick={toggleResponsiveModal}>
                      <i className="mdi mdi-plus-circle me-2"></i> Add Client
                    </Button>
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

              <Card>
                <Card.Body>
                  <h4 className="header-title mt-0 mb-1">Clients</h4>
                  <Table hover responsive className={classNames("table-centered", "table-nowrap", "mb-0")}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((record, index) => (
                        <tr key={index}>
                          <th scope="row">{record.id}</th>
                          <td>{record.name}</td>
                          <td>{record.email}</td>
                          <td>{record.address}</td>
                          <td>{record.contact}</td>
                          <td>
                            <i
                              className="bi bi-trash ms-2 cursor-pointer"
                              id="sa-warning"
                              onClick={() => deleteClient(record.id)}
                            ></i>
                            <i
                              className="bi bi-pencil-square ms-2 cursor-pointer"
                              onClick={() => openEditClientModal(record)}
                            ></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});

export default Clients;
