import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import classNames from "classnames";
import axios from "axios";

import { withSwal } from "react-sweetalert2";

// dummy data
import PageTitle from "../../../../components/PageTitle";
import Table from "../../../../components/Table";
import { OrdersDTO } from "../../../../DTOs/OrderDTO";

/* total amount column render */
const TotalAmountColumn = ({ row }: { row: any }) => {
    return (
        <>
            BDT {row.original.total_amount}
        </>
    );
};

/* product column render */
const ProductsColumn = ({ row }: { row: any }) => {
    return (
        <>
            {(row.original.pro_det || []).map((product: { id: number; image_url: string }, index: number) => (
                <Link to={`/apps/ecommerce/productDetails${product.id}`} key={index}>
                    <img src={product.image_url} alt="" height="32" />
                </Link>
            ))}
        </>
    );
};

/* orderdate column render */
const OrderDateColumn = ({ row }: { row: any }) => {
    return (
        <>
            {row.original.order_date}{" "}
            <small className="text-muted">{row.original.order_time}</small>
        </>
    );
};

/* status column render */
const StatusColumn = ({ row }: { row: any }) => {
    return (
        <>
            <h5>
                <span
                    className={classNames("badge", {
                        "bg-success": row.original.status === "Delivered",
                        "bg-danger": row.original.status === "Cancelled",
                        "bg-info": row.original.status === "Shipped",
                        "bg-warning": row.original.status === "Processing",
                    })}
                >
                    {row.original.status}
                </span>
            </h5>
        </>
    );
};

/* action column render */
const ActionColumn = ({ row }: { row: any }) => {
    const navigate = useNavigate();
    const exchangeOrder = (id: Number) => {
        localStorage.setItem("ExchangeOrderID", id.toString());
        alert("Place your updated order now");
        navigate("/apps/products");
    };

    const returnOrder = async (id: Number) => {
        const fullUrl = `https://reseller.whitexdigital.com/api/orders/returnorder/${id}`;
        try {
            const response = await axios.post(fullUrl);
            if (response.status === 200) {
                alert("Operation Successful");
            }
        } catch (error) {
            console.error("API call error:", error);
            alert("Something Went Wrong");
        }
    };

    return (
        <>
            <div className="action-icon " onClick={() => exchangeOrder(row.original.id)}>
                {" "}
                <i className="mdi mdi-square-edit-outline cursor-pointer"></i>
            </div>
            <div className="action-icon " onClick={() => returnOrder(row.original.id)}>
                {" "}
                <i className="mdi mdi-delete cursor-pointer"></i>
            </div>
        </>
    );
};

// get all columns
const columns = [
    {
        Header: "Order ID",
        accessor: "order_id",
    },
    {
        Header: "Type",
        accessor: "tpe",
    },
    {
        Header: "Date",
        accessor: "date",
        Cell: OrderDateColumn,
    },

    {
        Header: "Order Status",
        accessor: "status",
        Cell: StatusColumn,
    },

];

// get page list to display
const sizePerPageList = [
    { text: "10", value: 10 },
    { text: "20", value: 20 },
    { text: "50", value: 50 },
];

// main component
const OrderRequests = withSwal((props: any) => {
    const { swal } = props;
    const [orderList, setOrderList] = useState<OrdersDTO[]>([]);


    const fetchOrderRequests = async () => {
        const fullUrl = "https://reseller.whitexdigital.com/api/orders/request";
        try {
            const response = await axios.get<OrdersDTO[]>(fullUrl);
            console.log(response);
            setOrderList(response.data);


        } catch (error) {
            console.error("API call error:", error);
            swal.fire({
                title: "Error",
                text: "Something went wrong",
                icon: "error",
            });
        }
    };

    useEffect(() => {
        fetchOrderRequests();
    }, []);





    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Ecommerce", path: "/apps/orderrequests" },
                    { label: "Orders", path: "/apps/orderrequests", active: true },
                ]}
                title={"Order Requests"}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>

                            <Table
                                columns={columns}
                                data={orderList}
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
                </Col>
            </Row>
        </>
    );
});

export default OrderRequests;
