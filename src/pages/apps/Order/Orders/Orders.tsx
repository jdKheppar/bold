import { useEffect, useState } from "react";
import { Row, Col, Card, Button, Table } from "react-bootstrap";
import classNames from "classnames";
import PageTitle from "../../../../components/PageTitle";
import { OrdersDTO } from "../../../../DTOs/OrderDTO";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { withSwal } from "react-sweetalert2";

// main component
const Orders = withSwal((props: any) => {
  const { swal } = props;
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrdersDTO[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrdersDTO[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const exchangeOrder = (id: Number) => {
    localStorage.setItem("ExchangeOrderID",id.toString());
    swal.fire({
      title: "Place now",
      text: "Place your updated order now",
      icon: "success",
    });
    navigate("/apps/products");
  };

  const fetchOrders = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/orders";
    try {
      const response = await axios.get(fullUrl);
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error("API call error:", error);
      swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (e: any) => {
    const status = e.target.value;
    setSelectedStatus(status);
    if (status === "All") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Ecommerce", path: "/apps/ecommerce/orders" },
          { label: "Orders", path: "/apps/ecommerce/orders", active: true },
        ]}
        title={"Orders"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col lg={8}>
                  <form className="row gy-2 gx-2 align-items-center justify-content-lg-start justify-content-between">
                    <div className="col-auto">
                      <div className="d-flex align-items-center w-auto">
                        <label htmlFor="status-select" className="me-2">
                          Status
                        </label>
                        <select
                          className="form-select"
                          id="status-select"
                          onChange={handleStatusChange}
                          value={selectedStatus}
                        >
                          <option value="All">All</option>
                          <option value="Paid">Paid</option>
                          <option value="Authorization">Awaiting Authorization</option>
                          <option value="Failed">Payment failed</option>
                          <option value="Unpaid">Unpaid</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </Col>
              </Row>
              {filteredOrders && (
                <Card>
                  <Card.Body>
                    <h4 className="header-title mt-0 mb-1">Clients</h4>
                    <Table hover responsive className={classNames("table-centered", "table-nowrap", "mb-0")}>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer Name</th>
                          <th>Total Amount</th>
                          <th>Order Date</th>
                          <th>Order Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((record, index) => (
                          <tr key={index}>
                            <th scope="row">{record.id}</th>
                            <td>{record.customer_name}</td>
                            <td>{record.total_amount}</td>
                            <td>{record.order_date}</td>
                            <td>{record.status}</td>
                            <td>
                              <i className="bi bi-arrow-left-right"></i>
                              <i
                                className="bi bi-x-circle ms-2 cursor-pointer"
                                id="sa-warning"
                                onClick={() => exchangeOrder(record.id)}
                              ></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});

export default Orders;
