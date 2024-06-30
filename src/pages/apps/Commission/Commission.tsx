import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import classNames from "classnames";

// components

import axios from "axios";
import { CommissionDTO } from "../../../DTOs/Commission";
import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";

// get all columns
const columns = [
  {
    Header: "Order ID",
    accessor: "order_id",
  },
  {
    Header: "Sale Amount",
    accessor: "sale_amount",
  },
  {
    Header: "Commission Amount",
    accessor: "commission_amount",
  },
  {
    Header: "Order Date",
    accessor: "order_date",
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
                    <Table
                      columns={columns}
                      data={commissions}
                      isSearchable={true}
                      pageSize={10}
                      sizePerPageList={sizePerPageList}
                      isSortable={true}
                      pagination={true}
                      isSelectable={false}
                      theadClass="table-light"
                      searchBoxClass="mb-2"
                    />



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