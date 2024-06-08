import React from "react";
import { Row, Col } from "react-bootstrap";
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
                        description="Total Commissions"
                        stats="58947"
                        icon="fe-shopping-cart"

                    />
                </Col>
                <Col md={8} xl={4}>
                    <StatisticsWidget
                        variant="success"
                        description="Pending Payouts"
                        stats="127"
                        icon="bi-cash"
                    />
                </Col>
                <Col md={8} xl={4}>
                    <StatisticsWidget
                        variant="info"
                        description="Paid Amounts"
                        stats="0.58"

                        icon="bi-receipt-cutoff"
                    />
                </Col>

            </Row>
        </>
    );
};

export default Statistics;
