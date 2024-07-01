import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button , Form} from "react-bootstrap";
import classNames from "classnames";
import { withSwal } from "react-sweetalert2";

// components

import axios from "axios";
import { CommissionDTO } from "../../../DTOs/Commission";
import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";

// get all columns
const columns = [
  {
    Header: "Order ID",
    accessor: "order_id",
  },
  {
    Header: "Sale Amount",
    accessor: "sale_amount",
  },
  {
    Header: "Commission Amount",
    accessor: "commission_amount",
  },
  {
    Header: "Order Date",
    accessor: "order_date",
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
const Commissions = withSwal((props: any) => {
  const [commissions, setCommissions] = useState<CommissionDTO[]>([]);
  const [payoutAmount, setPayoutAmount] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  const [total, setTotal] = useState<number>(-1);

  const { swal } = props;

  const fetchPayouts = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/payouts";
    try {
        const response = await axios.get(fullUrl);
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

  function exchangeOrder(id: Number) {
    alert("We can't exchange right now");
  }
  const fetchOrders = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/commissions";
    try {
      const response = await axios.get(fullUrl);
      setCommissions(response.data);
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
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
          { label: "Dashboard", path: "/apps/commission" },
          { label: "Commission", path: "/apps/commission", active: true },
        ]}
        title={"Commission"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
                              <Row className="align-items-center">
                                <Col lg={12}>
                                    <Form>
                                        <Form.Group controlId="payoutAmount">
                                            <Form.Label>Enter Payout Amount</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter amount"
                                                value={payoutAmount}
                                                onChange={(e) => setPayoutAmount(Number(e.target.value))}
                                            />
                                            <Form.Label className="mt-2">Enter Note</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter any note..."
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Button variant="danger" onClick={handlePayoutRequest} className="mt-2 mb-2">
                                            Request Payout
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
              {
                commissions &&
                <Card>
                  <Card.Body>
                    <h4 className="header-title mt-0 mb-1">Commissions</h4>
                    <Table
                      columns={columns}
                      data={commissions}
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

export default Commissions;

// export {}