import React from 'react'

import { Row, Col, Card, Table } from "react-bootstrap";

interface TableRecords {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
}

// dummy records
const records: TableRecords[] = [
    { id: 1, firstName: "Mark", lastName: "Otto", userName: "@mdo" },
    { id: 2, firstName: "Jacob", lastName: "Thornton", userName: "@fat" },
    { id: 3, firstName: "Dave", lastName: "G", userName: "@dave" },
    { id: 4, firstName: "Nik", lastName: "N", userName: "@nikn" },
    { id: 5, firstName: "Shreyu", lastName: "Navadiya", userName: "@sn" },
];

const ResponsiveTable = () => {
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title">Earnings Details</h4>
                <p className="text-muted font-14 mb-4">
                    Across every breakpoint, use <code>responsive</code> attribute to
                    create responsive tables
                </p>

                <Table className="mb-0" responsive>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Sale Amount</th>
                            <th>Commission Amount</th>
                            <th>Payout Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(records || []).map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.firstName}</td>
                                    <td>{record.lastName}</td>
                                    <td>{record.userName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

const Earnings = () => {
    return (
        <><Row>
            <Col>
                <ResponsiveTable />
            </Col>
        </Row></>
    )
}

export default Earnings