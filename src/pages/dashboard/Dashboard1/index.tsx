import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Statistics from "./Statistics";


import RecentProducts from "./RecentProducts";
import RecentOrders from "./RecentOrders";

const Dashboard1 = () => {

  return (
    <>
      <Row>
        <Col>
          <div className="page-title-box">

            <h4 className="page-title">Dashboard</h4>
          </div>
        </Col>
      </Row>

      <Statistics />
      <Row>
        <Col xl={6}>
          <RecentProducts />
        </Col>
        <Col xl={6}>
          <RecentOrders/>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard1;
