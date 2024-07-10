import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import classNames from "classnames";
import axios from "axios";
import PageTitle from "../../../components/PageTitle";
import { PayoutDTO } from "../../../DTOs/Payout";
import { withSwal } from "react-sweetalert2";
import Table from "../../../components/Table";


// get all columns
const columns = [
    {
        Header: "Payout ID",
        accessor: "id",
    },
    {
        Header: "Amount Requested",
        accessor: "amount_requested",
    },
    {
        Header: "Date",
        accessor: "date",
    },
    {
        Header: "Message",
        accessor: "message",
    },
    {
        Header: "Status",
        accessor: "status",
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
const Payouts = withSwal((props: any) => {
    const { swal } = props;
    const [payouts, setPayouts] = useState<PayoutDTO[]>([]);



    const fetchPayouts = async () => {
        const fullUrl = "https://reseller.whitexdigital.com/api/payouts";
        try {
            const response = await axios.get(fullUrl);
            setPayouts(response.data.payouts);
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

                            {
                                payouts &&
                                <Card className="mt-4">
                                    <Card.Body>
                                        <h4 className="header-title mt-0 mb-1">Payouts</h4>
                                        <Table
                                            columns={columns}
                                            data={payouts}
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
});

export default Payouts;
