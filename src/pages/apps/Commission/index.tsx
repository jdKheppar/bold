import React from 'react'
import Statistics from './Statistics'
import { Row, Col } from "react-bootstrap";
import Commissions from './Commission';


const Commission = () => {
    return (
        <>
            <Row>
                <Col>
                    <h4 className="page-title">Commission Overview</h4>
                </Col>
            </Row>
            <Statistics />
            <Commissions />

        </>
    )
}

export default Commission