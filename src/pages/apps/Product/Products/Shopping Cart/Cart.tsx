
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
  shipping?: number;
}

interface CartItemTypes {
  id: number;
  slug: string;
  image: string;
  title: string;
  price: number;
  custom_price: number;
  current_stock: number;
  quantity: number;
  total: number;
  discount_price: number;
  color_id: number;
  shipping: number;
  attribute_values: number[];
  variants_ids: string;
  variants_name: string;
  name: string;
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
                <td>Shipping :</td>
                <td>BDT {summary.shipping!}</td>
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
  const [shippinginfor, setShippingInfor] = useState("");
  useEffect(() => {
    let previousShipping = summary.shipping || 0;
    let newShippingValue = 0;

    if (shippinginfor === "Inside Dhaka") {
      newShippingValue = 120;
    } else if (shippinginfor === "Outside Dhaka") {
      newShippingValue = 150;
    }

    setSummary(prevSummary => ({
      ...prevSummary,
      net_total: prevSummary?.net_total! - previousShipping + newShippingValue,
      shipping: newShippingValue
    }));
  }, [shippinginfor]);

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
    shipping: 0

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
    const newQty = e.target.value;
    const updatedItems = items.map((i) =>
      i.id === item.id ? { ...i, quantity: newQty, total: i.price * newQty } : i
    );
    setItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    _adjustCart(updatedItems);
  };

  const onCustomPChange = (e: any, item: CartItemTypes) => {
    const newCustomPrice = parseFloat(e.target.value) || 0;
    const updatedItems = items.map((i) =>
      i.id === item.id ? { ...i, custom_price: newCustomPrice } : i
    );
    setItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    _adjustCart(updatedItems);
  };



  const removeItem = (e: any, item: CartItemTypes) => {
    e.preventDefault();

    // Define a function to compare two cart items based on their unique attributes
    const isSameItem = (a: CartItems, b: CartItemTypes) => {
      return a.id === b.id &&
        a.color_id === b.color_id &&
        JSON.stringify(a.attribute_values) === JSON.stringify(b.attribute_values);
    };
    // Filter items in the cart excluding the item to be removed
    var localItems = items.filter((i) => !isSameItem(i, item));
    setItems(localItems);
    // Filter stored items in the cart excluding the item to be removed
    var storedItemsUpdated = storedItems.filter((i) => !isSameItem(i, item));
    //var localItems = items.filter((i) => i.id !== item.id);

    //var storedItemsUpdated = storedItems.filter((i) => i.id !== item.id);

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
    let newNetTotal = newGrossTotal// - totalDiscount;

    // update items and summary

    setSummary({
      ...summary,
      gross_total: newGrossTotal,
      discount: 0,
      net_total: newNetTotal,
    });
  };


  const getProducts = () => {
    try {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      setStoredItems(storedCartItems);
      setItems(storedCartItems);


    } catch (error) {
      console.error("Error while getting products:", error);
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
        let newClientSelection:ClientDTO[] = [
          {
            id: response.data.data.id,
            name: client.name,
            email: client.email,
            contact: client.contact,
            address: client.address,
            country_id: (client.country_id),
            state_id: (client.state_id),
            city_id: (client.city_id),
            country_name: (client.country_name),
            state_name: String(client.state_name),
            city_name: String(client.city_name),
            postal_code: (client.postal_code)
          }
        ];
        setClientSelections(newClientSelection);
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
        color_id: item.color_id || 0,
        quantity: Number(item.quantity),
        attribute_values: item.attribute_values || [],
        variants_ids: item.variants_ids || "",
        price: Number(item.price),
        custom_price: Number(item.custom_price),
        variants_name: item.variants_name || [],
        slug: item.slug 

      })),
      clientID: selectedClientId,
      note,
      shipping: shippinginfor,
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
    // Calculate total for each item
    console.log(items);
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
                                      alt={item.name}

                                      title="contact-img"
                                      className="rounded me-3"
                                      height="20"
                                      width="20"
                                    />

                                    <p className="m-0 d-inline-block align-middle font-16">
                                      <Link
                                        to={`/apps/products/${item.slug}`}
                                        className="text-body"
                                      >
                                        {item.name}
                                      </Link>

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
                                      max={item.current_stock}
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
                  <Row className="mt-2 mb-4">
                    <Col sm={12}
                    >
                      <div >
                        <label htmlFor="shippinginfo" className="form-label">
                          Select Delivery Charges
                        </label>
                        <select
                          id="shipselect"
                          className="form-select"
                          onChange={(e) => setShippingInfor(e.target.value)}
                        // value={selectedAttributes[attribute.id] || ""}
                        >
                          <option value="">Select</option>

                          <option key="1" value="Inside Dhaka">
                            Inside Dhaka
                          </option>
                          <option key="2" value="Outside Dhaka">
                            Outside Dhaka
                          </option>

                        </select>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col><CartSummary summary={summary} /></Col>
                  </Row>

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
