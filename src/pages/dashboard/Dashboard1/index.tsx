import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

// components
import HyperDatepicker from "../../../components/Datepicker";

import Statistics from "./Statistics";
import RevenueChart from "./RevenueChart";
import SalesAnalyticsChart from "./SalesAnalyticsChart";
import RevenueHistory from "./RevenueHistory";

import { revenueHistory } from "./data";
import RecentProducts from "./RecentProducts";

const Dashboard1 = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  /*
   * handle date change
   */
  const onDateChange = (date: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

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

      {/* <Row>
        <Col lg={4}>
          <RevenueChart />
        </Col>
        <Col lg={8}>
          <SalesAnalyticsChart />
        </Col>
      </Row> */}

      <Row>
        <Col xl={6}>
          <RecentProducts />
        </Col>
        <Col xl={6}>
          <RevenueHistory revenueHistory={revenueHistory} />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard1;
