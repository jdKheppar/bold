import { useState } from "react";
import { Row, Col } from "react-bootstrap";


import RecentProducts from "./RecentProducts";
import RecentOrders from "./RecentOrders";
import RevenueChart from "./RevenueChart";
import PerformanceChart from "./PerformanceChart";
import Statistics from "./Statistics";

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
          <RevenueChart />
        </Col>
        <Col xl={6}>
          <PerformanceChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <RecentProducts />
        </Col>
        <Col xl={6}>
          <RecentOrders />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard1;
