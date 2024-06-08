import React from 'react'
import Statistics from './Statistics'
import Earnings from './Earnings'
import { Row, Col } from "react-bootstrap";


const Commission = () => {
    return (
        <>
            <Row>
                <Col>
                    <h4 className="page-title">Commission Overview</h4>
                </Col>
            </Row>
            <Statistics />
            <Earnings />

        </>
    )
}

export default Commission