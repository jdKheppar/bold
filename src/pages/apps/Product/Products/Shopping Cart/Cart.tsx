import React, { useEffect, useState } from "react";
import { Row, Col, Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import PageTitle from "../../../../../components/PageTitle";

interface ProductItemTypes {
  id: number;
  title: string;
  image: string;
  rating: number;
  price: number;
  wholesale_price: number;
  current_stock: number;
  custom_price: number;
}
interface Client {
  id: number;
  name: string;
}

const Cart: React.FC = () => {
  const [products, setProducts] = useState<ProductItemTypes[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const handleSelect = (clientId: number) => {
    setSelectedClientId(clientId);
  };

  const fetchClients = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/client";
    try {
      const response = await axios.get(fullUrl);
      console.log(response);
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
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, current_stock: newQuantity } : product
      )
    );
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  const calculateTotalCustomPrice = () => {
    return products.reduce((total, product) => total + product.custom_price, 0);
  };

  const getProducts = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/products";
    try {
      const response = await axios.get(fullUrl);
      const allProducts = response.data.data;
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const filteredProducts = allProducts.filter((product: ProductItemTypes) =>
        storedCartItems.includes(product.id)
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };

  useEffect(() => {
    getProducts();
    fetchClients();
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
                    <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        {selectedClientId
                          ? clients.find((client) => client.id === selectedClientId)?.name
                          : "Select Client"}{" "}
                        <i className="mdi mdi-chevron-down"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {clients.map((client) => (
                          <Dropdown.Item
                            key={client.id}
                            onClick={() => handleSelect(client.id)}
                          >
                            {client.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col sm={12}>
                  <a
                    href="apps/products"
                    className="btn text-muted d-none d-sm-inline-block btn-link fw-semibold"
                  >
                    <i className="mdi mdi-arrow-left"></i> Continue Shopping{" "}
                  </a>
                </Col>
                <Col sm={6}>
                  <div className="text-sm-end">
                    <Link to="/apps/ecommerce/checkout" className="btn btn-danger">
                      <i className="mdi mdi-cart-plus me-1"></i> Checkout{" "}
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
