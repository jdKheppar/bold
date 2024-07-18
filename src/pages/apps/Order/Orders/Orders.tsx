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
      {(row.original.products || []).map((product: { id: number; image_url: string }, index: number) => (
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
      if(response.status === 200){
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
    accessor: "id",
  },
  {
    Header: "Products",
    accessor: "product_img",
    Cell: ProductsColumn,
  },
  {
    Header: "Date",
    accessor: "order_date",
    Cell: OrderDateColumn,
  },
  {
    Header: "Total",
    accessor: "total_amount",
    Cell: TotalAmountColumn,
  },
  {
    Header: "Order Status",
    accessor: "status",
    Cell: StatusColumn,
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ActionColumn,
  },
];

// get page list to display
const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "20", value: 20 },
  { text: "50", value: 50 },
];

// main component
const Orders = withSwal((props: any) => {
  const { swal } = props;
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState<OrdersDTO[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<string[]>([]);
  const [orderDates, setOrderDates] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<string>("All");
  const [toDate, setToDate] = useState<string>("All");

  const fetchOrders = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/orders";
    try {
      const response = await axios.get<OrdersDTO[]>(fullUrl);
      setOrderList(response.data);

      // Extract unique order statuses and order dates
      const uniqueStatuses: string[] = Array.from(new Set(response.data.map((order: OrdersDTO) => order.status)));
      const uniqueDates: string[] = Array.from(new Set(response.data.map((order: OrdersDTO) => order.order_date)));
      setOrderStatuses(uniqueStatuses);
      setOrderDates(uniqueDates);
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
    fetchOrders();
  }, []);

  // change order status group
  const changeOrderStatusGroup = (orderStatusGroup: string) => {
    let updatedData = [...orderList];
    updatedData =
      orderStatusGroup === "All"
        ? orderList
        : [...orderList].filter((o) =>
            o.status?.includes(orderStatusGroup)
          );
    setOrderList(updatedData);
  };

  // change order date range
  const changeOrderDateRange = (fromDate: string, toDate: string) => {
    let updatedData = [...orderList];

    if (fromDate !== "All" && toDate !== "All") {
      updatedData = updatedData.filter((o) => {
        return o.order_date >= fromDate && o.order_date <= toDate;
      });
    }

    setOrderList(updatedData);
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Ecommerce", path: "/apps/ecommerce/orders" },
          { label: "Orders", path: "/apps/ecommerce/orders", active: true },
        ]}
        title={"Orders"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col lg={8}>
                  <form className="row gy-2 gx-2 align-items-center justify-content-lg-start justify-content-between">
                    <div className="col-auto">
                      <div className="d-flex align-items-center w-auto">
                        <label htmlFor="status-select" className="me-2">
                          Status
                        </label>
                        <select
                          className="form-select"
                          id="status-select"
                          onChange={(e: any) => changeOrderStatusGroup(e.target.value)}
                        >
                          <option value="All">All</option>
                          {orderStatuses.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-auto">
                      <div className="d-flex align-items-center w-auto">
                        <label htmlFor="from-date-select" className="me-2">
                          From Date
                        </label>
                        <select
                          className="form-select"
                          id="from-date-select"
                          onChange={(e: any) => {
                            setFromDate(e.target.value);
                            changeOrderDateRange(e.target.value, toDate);
                          }}
                        >
                          <option value="All">All</option>
                          {orderDates.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-auto">
                      <div className="d-flex align-items-center w-auto">
                        <label htmlFor="to-date-select" className="me-2">
                          To Date
                        </label>
                        <select
                          className="form-select"
                          id="to-date-select"
                          onChange={(e: any) => {
                            setToDate(e.target.value);
                            changeOrderDateRange(fromDate, e.target.value);
                          }}
                        >
                          <option value="All">All</option>
                          {orderDates.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                </Col>

                <Col lg={4}>
                  <div className="text-lg-end mt-xl-0 mt-2">
                    <Link to="/apps/products" className="btn btn-danger mb-2 me-2">
                      <i className="mdi mdi-basket me-1"></i> Add New Order
                    </Link>
                    <Button className="btn btn-light mb-2">Export</Button>
                  </div>
                </Col>
              </Row>

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

export default Orders;
