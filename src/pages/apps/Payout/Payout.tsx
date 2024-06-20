import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Table, Form } from "react-bootstrap";
import classNames from "classnames";
import axios from "axios";
import PageTitle from "../../../components/PageTitle";
import { PayoutDTO } from "../../../DTOs/Payout";
import { withSwal } from "react-sweetalert2";


// main component
const Orders = withSwal((props: any) => {
    const { swal } = props;
    const [payouts, setPayouts] = useState<PayoutDTO[]>([]);
    const [total, setTotal] = useState<number>(-1);
    const [payoutAmount, setPayoutAmount] = useState<number>(0);

    const orderPayout = async (amount: number) => {
        const fullUrl = `https://reseller.whitexdigital.com/api/request_payouts?amount=${amount}`;
        try {
            const response = await axios.post(fullUrl);
           
            swal.fire({
                title: "Success!",
                text: "Payout requested successfully!",
                icon: "success",
              });
        } catch (error) {
            console.error("API call error:", error);
            swal.fire({
                title: "Error!",
                text: "Something Went Wrong!",
                icon: "error",
              });
        }
    }

    const fetchPayouts = async () => {
        const fullUrl = "https://reseller.whitexdigital.com/api/payouts";
        try {
            const response = await axios.get(fullUrl);
            setPayouts(response.data.payouts);
            setTotal(response.data.total);
        } catch (error) {
            swal.fire({
                title: "Error!",
                text: "Something Went Wrong!",
                icon: "error",
              });
            console.error("API call error:", error);
        }
    };

    useEffect(() => {
        fetchPayouts();
    }, []);

    const handlePayoutRequest = () => {
        if (payoutAmount > 0 && payoutAmount < total + 1) {
            orderPayout(payoutAmount);
        } else {
            alert("Please enter a valid amount.");
        }
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Ecommerce", path: "/apps/ecommerce/Payout" },
                    { label: "Payouts", path: "/apps/ecommerce/Payout", active: true },
                ]}
                title={"Payouts"}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col lg={8}>
                                    <Form>
                                        <Form.Group controlId="payoutAmount">
                                            <Form.Label>Enter Payout Amount</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter amount"
                                                value={payoutAmount}
                                                onChange={(e) => setPayoutAmount(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Button variant="danger" onClick={handlePayoutRequest} className="mt-2">
                                            Request Payout
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                            {
                                payouts &&
                                <Card className="mt-4">
                                    <Card.Body>
                                        <h4 className="header-title mt-0 mb-1">Payouts</h4>
                                        <Table hover responsive className={classNames("table-centered", "table-nowrap", "mb-0")}>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Amount Requested</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {payouts.map((record, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">{record.id}</th>
                                                        <td>{record.amount_requested}</td>
                                                        <td>{record.date}</td>
                                                        <td>{record.status}</td>
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
});

export default Orders;