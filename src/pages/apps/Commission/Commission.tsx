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

];



// main component
const Commissions = () => {
  const [commissions, setCommissions] = useState<CommissionDTO[]>([]);


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
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/apps/commission" },
          { label: "Commission", path: "/apps/commission", active: true },
        ]}
        title={"Commission"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>

              {
                commissions &&
                <Card>
                  <Card.Body>
                    <h4 className="header-title mt-0 mb-1">Commission</h4>
                    <Table hover responsive className={classNames("table-centered", "table-nowrap", "mb-0")}>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Sale Amount</th>
                          <th>Total Amount</th>
                          <th>Order Date</th>

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

export default Commissions;

// export {}