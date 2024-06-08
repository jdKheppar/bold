import { Row, Col, Card } from "react-bootstrap";
import Table from "../../../../components/Table";
import { records as data, expandableRecords } from "./data";

const columns = [
    {
        Header: "OrderID",
        accessor: "id",
        sort: true,
    },
    {
        Header: "Customer Name",
        accessor: "name",
        sort: true,
    },
    {
        Header: "Total Amount",
        accessor: "phone",
        sort: false,
    },
    {
        Header: "Order Date",
        accessor: "age",
        sort: true,
    },
    {
        Header: "Status",
        accessor: "company",
        sort: false,
    },
];
const sizePerPageList = [
    {
        text: "5",
        value: 5,
    },
    {
        text: "10",
        value: 10,
    },
    {
        text: "25",
        value: 25,
    },
    {
        text: "All",
        value: data.length,
    },
];

const OrdersList = () => {
    return (
        <><Row>
            <Col>
                <Card>
                    <Card.Body>
                        <h4 className="header-title">Order History</h4>
                        <p className="text-muted font-14 mb-4">
                            A simple example of table with pagination and column sorting
                        </p>

                        <Table
                            columns={columns}
                            data={data}
                            pageSize={5}
                            sizePerPageList={sizePerPageList}
                            isSortable={true}
                            pagination={true}
                        />
                    </Card.Body>
                </Card>
            </Col>
        </Row></>
    )
}

export default OrdersList
