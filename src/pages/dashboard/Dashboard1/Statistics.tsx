import React from "react";
import { Row, Col } from "react-bootstrap";

// componets
import StatisticsWidget from "../../../components/StatisticsWidget";

const Statistics = () => {
  return (
    <>
      <Row>
        <Col md={8} xl={4}>
          <StatisticsWidget
            variant="primary"
            counterOptions={{
              prefix: "$",
            }}
            description="Total Sales"
            stats="58947"
            icon="fe-shopping-cart"
            
          />
        </Col>
        <Col md={8} xl={4}>
          <StatisticsWidget
            variant="success"
            description="Total Commission"
            stats="127"
            icon="bi-cash"
          />
        </Col>
        <Col md={8} xl={4}>
          <StatisticsWidget
            variant="info"
            description="Pending Orders"
            stats="0.58"
            
            icon="bi-receipt-cutoff"
          />
        </Col>
        {/* <Col md={6} xl={3}>
          <StatisticsWidget
            variant="warning"
            description="Today's Visits"
            stats="78412"
            icon="fe-eye"
          />
        </Col> */}
      </Row>
    </>
  );
};

export default Statistics;
