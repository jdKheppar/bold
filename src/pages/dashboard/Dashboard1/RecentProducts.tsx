import React, { useEffect, useState } from "react"; import { Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";

interface ProductItemTypes {
  id: number;
  title: string;
  image: string;
  rating: number;
  price: number;
  wholesale_price: number;
  current_stock: number;
}

const RecentProducts = () => {
  const [products, setProducts] = useState<Array<ProductItemTypes>>([]);



  const getProducts = async () => {

    const fullUrl = "https://reseller.whitexdigital.com/api/products";
    try {
      let response = await axios.get(fullUrl);
      setProducts(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Card>
        <Card.Body>
          {/* <Dropdown className="float-end" align="end">
            <Dropdown.Toggle as="a" className="card-drop cursor-pointer">
              <i className="mdi mdi-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Edit Report</Dropdown.Item>
              <Dropdown.Item>Export Report</Dropdown.Item>
              <Dropdown.Item>Action</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}

          <h4 className="header-title mb-3">New Products</h4>
          <div className="table-responsive">
            <table className="table table-borderless table-hover table-nowrap table-centered m-0">
              <thead className="table-light">
                <tr>
                  <th colSpan={2}>Product Img</th>
                  <th>Price</th>
                  <th>Wholesale Price</th>
                  <th>Stocks</th>
                </tr>
              </thead>
              <tbody>
                {(products || []).map((item, i) => {
                  return (
                    <tr key={i}>
                      <td style={{ width: "36px" }}>
                        <img
                          src={item.image}
                          alt="contact-img"
                          title="contact-img"
                          className="rounded-circle avatar-sm"
                        />
                      </td>

                      <td>
                        <h5 className="m-0 fw-normal">{item.title}</h5>
                        {/* <p className="mb-0 text-muted">
                          <small>Member Since 2017</small>
                        </p> */}
                      </td>

                      <td>
                        <i
                        // className={classNames("mdi", "text-primary", {
                        //   "mdi-currency-btc": item.currency === "BTC",
                        //   "mdi-currency-eth": item.currency === "ETH",
                        //   "mdi-currency-eur": item.currency === "EUR",
                        //   "mdi-currency-cny": item.currency === "CNY",
                        // })}
                        ></i>{" "}
                        {item.price}
                      </td>

                      <td>{item.wholesale_price} </td>

                      <td>{item.current_stock}</td>

                      {/* <td>
                        <Link to="#" className="btn btn-xs btn-light">
                          <i className="mdi mdi-plus"></i>
                        </Link>
                        <Link to="#" className="btn btn-xs btn-danger">
                          <i className="mdi mdi-minus"></i>
                        </Link>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default RecentProducts;
