import React, { useEffect, useState } from "react";
import { Row, Col, Card, Dropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PageTitle from "../../../../../components/PageTitle";
import { withSwal } from "react-sweetalert2";
import { ProductItemTypes } from "../../../../../DTOs/ProductItemTypes";
import { ClientDTO } from "../../../../../DTOs/ClientDTO";
import { Typeahead } from "react-bootstrap-typeahead";


const Cart: React.FC = withSwal((props: any) => {
  const { swal } = props;
  const navigate = useNavigate();

  let exchangeOrderItem = localStorage.getItem("ExchangeOrderID");

  // const C_options: Array<ClientDTO> = [
  //   { id: 1, name: "Chocolate", email: "", contact: "", address: "", country: 0, state: 0, city: 0, postal_code: 0 },
  //   { id: 2, name: "Strawberry", email: "", contact: "", address: "", country: 0, state: 0, city: 0, postal_code: 0 },
  //   { id: 3, name: "Vanilla", email: "", contact: "", address: "", country: 0, state: 0, city: 0, postal_code: 0 },
  // ];

  const [titleText, setTitleText] = useState("");
  const [products, setProducts] = useState<ProductItemTypes[]>([]);
  const [clients, setClients] = useState<ClientDTO[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCustomPrice, setTotalCustomPrice] = useState(0);
  const [clientSelections, setClientSelections] = useState<ClientDTO[]>([]);

  const onChangeClientSelection = (selected: ClientDTO[]) => {
    setClientSelections(selected);
    if (selected && selected[0]) {
      setSelectedClientId(selected[0].id);
    }

  };
  let exchangeOrderItme = localStorage.getItem("ExchangeOrderID");
  const fetchClients = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/client";
    try {
      const response = await axios.get(fullUrl);
      setClients(response.data.data);
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };

  const removeProduct = (productId: number) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);

    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const updatedCartItems = storedCartItems.filter((id: number) => id !== productId);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const onCustomPriceChange = (e: React.ChangeEvent<HTMLInputElement>, productId: number) => {
    const newCustomPrice = parseFloat(e.target.value);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, custom_price: newCustomPrice } : product
      )
    );
  };

  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, productId: number) => {
    const newQuantity = parseInt(e.target.value, 10);
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === productId ? { ...product, current_stock: newQuantity } : product
      );

      // Recalculate totals
      setTotalPrice(calculateTotalPrice());
      setTotalCustomPrice(calculateTotalCustomPrice());

      return updatedProducts;
    });
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + (Number(product.price) * product.current_stock), 0);
  };

  const calculateTotalCustomPrice = () => {
    return products.reduce((total, product) => total + (Number(product.custom_price) * product.current_stock), 0);
  };



  const getProducts = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/products";
    try {
      const response = await axios.get(fullUrl);
      const allProducts = response.data.data;
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const filteredProducts = allProducts
        .filter((product: ProductItemTypes) => storedCartItems.includes(product.id))
        .map((product: ProductItemTypes) => ({
          ...product,
          custom_price: product.price, // Set custom_price to price
        }));
      setProducts(filteredProducts);
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };
  const handleCheckout = async () => {
    if (products.length === 0) {
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
      products: products.map((product) => ({
        id: product.id,
        quantity: product.current_stock,
        custom_price: Number(product.custom_price),
      })),
      clientID: selectedClientId,
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
        title={"Shopping Cart"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={12}>
                  {products.length === 0 ? (
                    <p>No items in the cart</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-borderless table-centered mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Custom Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th style={{ width: "50px" }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  title="contact-img"
                                  className="rounded me-3"
                                  height="48"
                                  width="48"
                                />
                                <p className="m-0 d-inline-block align-middle font-16">
                                  <Link
                                    to="/apps/ecommerce/product-details"
                                    className="text-body"
                                  >
                                    {item.title}
                                  </Link>
                                </p>
                              </td>
                              <td>${item.price}</td>
                              <td>

                                <input
                                  type="number"
                                  min="1"
                                  value={item.custom_price}
                                  className="form-control"
                                  placeholder="Custom Price"
                                  style={{ width: "90px" }}
                                  onChange={(e) => onCustomPriceChange(e, item.id)}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.current_stock}
                                  className="form-control"
                                  placeholder="Quantity"
                                  style={{ width: "90px" }}
                                  onChange={(e) => onQuantityChange(e, item.id)}
                                />
                              </td>
                              <td>
                                {item.current_stock * item.price}
                              </td>
                              <td>
                                <Link
                                  to="#"
                                  className="action-icon"
                                  onClick={() => removeProduct(item.id)}
                                >
                                  <i className="mdi mdi-delete"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="border p-3 mt-4 mt-lg-0 rounded">
                    <h4 className="header-title mb-3">Order Summary</h4>
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <tbody>
                          <tr>
                            <td>Total Price :</td>
                            <td>${calculateTotalPrice()}</td>
                          </tr>
                          <tr>
                            <td>Total Custom Price :</td>
                            <td>${calculateTotalCustomPrice()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <label htmlFor="client" className="form-label mt-4">
                      Client:
                    </label>
                    <Typeahead
                      id="select4"
                      labelKey={"name"}
                      multiple={false}
                      onChange={onChangeClientSelection}
                      options={clients}
                      placeholder="Select a client..."
                      selected={clientSelections}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col sm={12}>
                  <a
                    href="/apps/products"
                    className="btn text-muted d-none d-sm-inline-block btn-link fw-semibold"
                  >
                    <i className="mdi mdi-arrow-left"></i> Continue Shopping{" "}
                  </a>
                </Col>
                <Col sm={6}>
                  <div className="text-sm-end" onClick={handleCheckout}>
                    <Button className="btn btn-danger" type="button">
                      <i className="mdi mdi-cart-plus me-1" ></i> Place Order{" "}
                    </Button>
                  </div>
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
