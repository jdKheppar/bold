import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Table } from "react-bootstrap";
import classNames from "classnames";

// components

import axios from "axios";
import { CommissionDTO } from "../../../DTOs/Commission";
import PageTitle from "../../../components/PageTitle";

// get all columns
const columns = [
  {
    Header: "Order ID",
    accessor: "id",
  },
  {
    Header: "Customer Name",
    accessor: "customer_name",
  },
  {
    Header: "Total Amount",
    accessor: "total_amount",
  },
  {
    Header: "Order Date",
    accessor: "order_date",
  },


  {
    Header: "Order Status",
    accessor: "status",
  },

];

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
const Orders = () => {
  const [commissions, setCommissions] = useState<CommissionDTO[]>([]);

  // // change order status group
  // const changeOrderStatusGroup = (OrderStatusGroup: string) => {
  //   let updatedData = [...orders];
  //   //  filter
  //   updatedData =
  //     OrderStatusGroup === "All"
  //       ? orders
  //       : [...orders].filter((o) =>
  //         o.payment_status?.includes(OrderStatusGroup)
  //       );
  //   setOrderList(updatedData);
  // };
  function exchangeOrder(id: Number) {
    alert("We can't exchange right now");
  }
  const fetchOrders = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/commissions";
    try {
      const response = await axios.get(fullUrl);
      setCommissions(response.data);
    } catch (error) {
      console.error("API call error:", error);
      // swal.fire({
      //   title: "Error",
      //   text: "Something went wrong",
      //   icon: "error",
      // });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


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
                        // onChange={(e: any) =>
                        //   changeOrderStatusGroup(e.target.value)
                        // }
                        >
                          <option value="All">All</option>
                          <option value="Paid">Paid</option>
                          <option value="Authorization">
                            Awaiting Authorization
                          </option>
                          <option value="Failed">Payment failed</option>
                          <option value="Unpaid">Unpaid</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </Col>


              </Row>
              {
                commissions &&
                <Card>
                  <Card.Body>
                    <h4 className="header-title mt-0 mb-1">Clients</h4>
                    <Table hover responsive className={classNames("table-centered", "table-nowrap", "mb-0")}>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Sale Amount</th>
                          <th>Total Amount</th>
                          <th>Order Date</th>
                          <th>Order Status</th>

                        </tr>
                      </thead>
                      <tbody>
                        {commissions.map((record, index) => (
                          <tr key={index}>
                            <th scope="row">{record.order_id}</th>
                            <td>{record.sale_amount}</td>
                            <td>{record.commission_amount}</td>
                            <td>{record.order_date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>


                  </Card.Body>
                </Card>
              }

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Orders;

// export {}