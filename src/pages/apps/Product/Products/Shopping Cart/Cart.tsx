
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../../../../components/PageTitle";
import { ProductItemTypes } from "../../../../../DTOs/ProductItemTypes";
import axios from "axios";
import { ClientDTO } from "../../../../../DTOs/ClientDTO";
import { CountriesDTO } from "../../../../../DTOs/CountriesDTO";
import { Typeahead } from "react-bootstrap-typeahead";
import { withSwal } from "react-sweetalert2";
import { CartItems } from "../../../../../DTOs/CartDTO";


interface CartSummaryTypes {
  gross_total?: number;
  custom_total?: number;
  discount?: number;
  net_total?: number;
}

interface CartItemTypes {
  id: number;

  image: string;
  title: string;
  price: number;
  custom_price: number;
  current_stock: number;
  quantity: number;
  total: number;
  discount_price: number;
}



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
      client.country_id = selected[0].id;
      client.country_name = selected[0].name;
      fetchStates(selected[0].id);
    }

  };
  const onChangeStateSelection = (selected: CountriesDTO[]) => {
    setStateSelections(selected);
    if (selected && selected[0]) {
      client.state_id = selected[0].id;
      client.state_name = selected[0].name;
      fetchCities(selected[0].id);
    }
    else {
      setStates([]);
    }

  };

  const onChangeCitySelection = (selected: CountriesDTO[]) => {
    setCitySelections(selected);
    if (selected && selected[0]) {
      client.city_id = selected[0].id;
      client.city_name = selected[0].name;
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




// summary
const CartSummary = (props: { summary: CartSummaryTypes }) => {
  const summary = props.summary || {};

  return (
    <>
      <div className="border p-3 mt-4 mt-lg-0 rounded">
        <h4 className="header-title mb-3">Order Summary</h4>

        <div className="table-responsive">
          <table className="table mb-0">
            <tbody>
              <tr>
                <td>Grand Total :</td>
                <td>BDT {summary.gross_total!}</td>
              </tr>
              <tr>
                <td>Discount : </td>
                <td>-BDT {summary.discount!}</td>
              </tr>
              <tr>
                <td>Custom Total :</td>
                <td>BDT {summary.custom_total!}</td>
              </tr>
              <tr>
                <th>Total :</th>
                <th>BDT {summary.net_total!}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// Cart
const Cart = withSwal((props: any) => {
  const { swal } = props;
  const navigate = useNavigate();
  let exchangeOrderItem = localStorage.getItem("ExchangeOrderID");

  const [items, setItems] = useState<CartItemTypes[]>([]);
  const [storedItems, setStoredItems] = useState<CartItems[]>([])
  const [clients, setClients] = useState<ClientDTO[]>([]);
  const [titleText, setTitleText] = useState("");

  const [client, setClient] = useState<ClientDTO>({
    id: 0,
    name: "",
    email: "",
    contact: "",
    address: "",
    country_id: 0,
    state_id: 0,
    city_id: 0,
    country_name: "",
    state_name: "",
    city_name: "",
    postal_code: 0,
  });
  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [summary, setSummary] = useState<CartSummaryTypes>({
    gross_total: 0,
    discount: 0,
    custom_total: 0,
    net_total: 0,
  });
  const [clientSelections, setClientSelections] = useState<ClientDTO[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<Number>();

  const toggleResponsiveModal = () => {
    setResponsiveModal(!responsiveModal);
  };

  const onChangeClientSelection = (selected: ClientDTO[]) => {
    setClientSelections(selected);
    if (selected && selected[0]) {
      setSelectedClientId(selected[0].id);
    }

  };
  const onQtyChange = (e: any, item: CartItemTypes) => {
    var localItems = [...items];
    var idx = localItems.findIndex((i) => i.id === item.id);
    var newQty = e.target.value;
    var newTotal = localItems[idx].price * newQty;
    localItems[idx] = { ...item, quantity: newQty, total: newTotal };
    _adjustCart(localItems);
  };
  const onCustomPChange = (e: any, item: CartItemTypes) => {
    var localItems = [...items];
    var idx = localItems.findIndex((i) => i.id === item.id);

    localItems[idx] = { ...item, custom_price: e.target.value };
    _adjustCart(localItems);
  };



  const removeItem = (e: any, item: CartItemTypes) => {
    e.preventDefault();
    var localItems = items.filter((i) => i.id !== item.id);
    var storedItemsUpdated = storedItems.filter((i) => i.id !== item.id);

    localStorage.setItem("cartItems", JSON.stringify(storedItemsUpdated));

    _adjustCart(localItems);
  };


  const _adjustCart = (localItems: CartItemTypes[]) => {
    // calculate total discount
    let totalDiscount = 0;
    for (let i = 0; i < localItems.length; i++) {
      totalDiscount += localItems[i].discount_price;
    }

    // calculate gross total
    let newGrossTotal = 0;
    for (const item of localItems) {
      newGrossTotal += item.total;
    }

    // calculate net total
    let newNetTotal = newGrossTotal - totalDiscount;

    // update items and summary
    // setItems(localItems);
    setSummary({
      ...summary,
      gross_total: newGrossTotal,
      discount: totalDiscount,
      net_total: newNetTotal,
    });
  };


  const getProducts = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/products";
    try {
      const response = await axios.get(fullUrl);
      const allProducts = response.data.data;
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      setStoredItems(storedCartItems);
      const filteredProducts = allProducts
        .filter((product: ProductItemTypes) => storedCartItems.some((item: any) => item.id === product.id))
        .map((product: ProductItemTypes) => {
          const matchedItem = storedCartItems.find((item: any) => item.id === product.id);
          return {
            ...product,
            custom_price: product.price,
            quantity: matchedItem.quantity,
            total: product.price * product.current_stock,
            discount_price: 0, // Adjust based on your discount logic
          };
        });
      setItems(filteredProducts);

    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
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
  const addClient = async () => {
    let newObj = {
      name: client.name,
      email: client.email,
      contact: client.contact,
      address: client.address,
      country_id: String(client.country_id),
      state_id: String(client.state_id),
      city_id: String(client.city_id),
      country_name: String(client.country_name),
      state_name: String(client.state_name),
      city_name: String(client.city_name),
      postal_code: String(client.postal_code)
    };
    const params = new URLSearchParams(newObj).toString();

    const fullUrl = `https://reseller.whitexdigital.com/api/client?${params}`;
    try {
      const response = await axios.post(fullUrl);
      console.log(response);
      if (response.data) {
        setSelectedClientId(response.data.data.id);
      }

      // closeEditClientModal();
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
  const handleCheckout = async () => {
    if (items.length === 0) {
      swal.fire({
        title: "Items?",
        text: "There is no item in the cart",
        icon: "question",
      })
      return;
    }
    if (!selectedClientId) {
      swal.fire({
        title: "Client?",
        text: "Please select client to continue",
        icon: "question",
      })
      return;
    }

    let prev_order_id = exchangeOrderItem ? exchangeOrderItem : null;
    const orderData = {
      products: items.map((item) => ({
        id: item.id,
        quantity: item.current_stock,
        custom_price: Number(item.custom_price),
      })),
      clientID: selectedClientId,
      note,
      prev_OrderID: prev_order_id
    };

    try {
      const response = await axios.post("https://reseller.whitexdigital.com/api/store_order", orderData);
      localStorage.removeItem("cartItems");
      let successMessage = exchangeOrderItem ? "Order updated successfully" : "Order placed successfully";

      localStorage.removeItem("ExchangeOrderID");
      swal.fire({
        title: "Success!",
        text: successMessage,
        icon: "success",
      })
      navigate("/apps/orders"); // Redirect to orders page or any other page
    } catch (error) {
      swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      })
      console.error("Checkout error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [id]: value,
    }));
  };

  useEffect(() => {
    getProducts();

    fetchClients();

    if (exchangeOrderItem) {
      setTitleText(`Shopping Cart (Place Exchange Order)`);
    }
    else {
      setTitleText("Shopping Cart");
    }
  }, []);
  useEffect(() => {
    _adjustCart(items);
  }, [items])


  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Ecommerce", path: "/apps/ecommerce/shopping-cart" },
          {
            label: "Shopping Cart",
            path: "/apps/ecommerce/shopping-cart",
            active: true,
          },
        ]}
        title={titleText}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={8}>
                  <Row className="mt-4">
                    <Col sm={6}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Client
                        </label>
                        <Typeahead
                          id="select3"
                          labelKey={"name"}
                          multiple={false}
                          onChange={onChangeClientSelection}
                          options={clients}
                          placeholder="Select a client..."
                          selected={clientSelections}
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3 mt-3">
                        <div >
                          <Button className="btn btn-danger mb-2 me-2" style={{ width: "100%", marginTop: "5px" }} onClick={toggleResponsiveModal}>
                            Add New Client
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
                      </div>

                    </Col>
                  </Row>
                  <div className="table-responsive">
                    <table className="table table-borderless table-centered mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Custom Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th style={{ width: "50px" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          items.length === 0 ? <tr><td colSpan={6} className="text-center">No items in cart</td></tr> :

                            (items || []).map((item, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>
                                    <img
                                      src={item.image}
                                      alt={item.title}

                                      title="contact-img"
                                      className="rounded me-3"
                                      height="20"
                                      width="20"
                                    />

                                    <p className="m-0 d-inline-block align-middle font-16">
                                      <Link
                                        to={`/apps/products/${item.id}`}
                                        className="text-body"
                                      >
                                        {item.title}
                                      </Link>
                                      {/* <br />
                                <small className="me-2">
                                  <b>Size:</b> {item.size}{" "}
                                </small>
                                <small>
                                  <b>Color:</b> {item.color}{" "}
                                </small> */}
                                    </p>
                                  </td>
                                  <td>{item.price}</td>
                                  <td>
                                    <input
                                      type="number"
                                      min="1"
                                      value={item.custom_price}
                                      className="form-control"
                                      placeholder="Custom Price"
                                      style={{ width: "90px" }}
                                      onChange={(e: any) => {
                                        onCustomPChange(e, item);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      min="1"
                                      value={item.quantity}
                                      className="form-control"
                                      placeholder="Qty"
                                      style={{ width: "90px" }}
                                      onChange={(e: any) => {
                                        onQtyChange(e, item);
                                      }}
                                    />
                                  </td>
                                  <td>{item.total}</td>
                                  {/* !.toFixed(2) */}
                                  <td>
                                    <Link
                                      to="#"
                                      className="action-icon"
                                      onClick={(e: any) => {
                                        removeItem(e, item);
                                      }}
                                    >
                                      {" "}
                                      <i className="mdi mdi-delete"></i>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })

                        }

                      </tbody>
                    </table>
                  </div>


                  <div className="mt-3">
                    <label className="form-label" htmlFor="example-textarea">
                      Add a Note:
                    </label>
                    <textarea
                      className="form-control"
                      id="example-textarea"
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Write some note.."
                    ></textarea>
                  </div>


                  <Row className="mt-4">
                    <Col sm={6}>
                      <a
                        href="/apps/products"
                        className="btn text-muted d-none d-sm-inline-block btn-link fw-semibold"
                      >
                        <i className="mdi mdi-arrow-left"></i> Continue Shopping{" "}
                      </a>
                    </Col>
                    <Col sm={6}>
                      <div className="text-sm-end">
                        <Button
                          className="btn btn-danger"
                          type="button"
                          onClick={handleCheckout}
                        >
                          <i className="mdi mdi-cart-plus me-1"></i> Place Order{" "}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col lg={4}>
                  <CartSummary summary={summary} />
                </Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});

export default Cart;
