import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import { OrdersDTO } from "../../../DTOs/OrderDTO";

const RevenueOrders = withSwal((props: any) => {
  const { swal } = props;
  const [orders, setOrders] = useState<OrdersDTO[]>([]);

  const fetchOrders = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/orders";
    try {
      const response = await axios.get(fullUrl);
      setOrders(response.data);
      
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
  return (
    <>
      <Card>
        <Card.Body>
         

          <h4 className="header-title mb-3">Latest Orders</h4>
          <div className="table-responsive">
            <table className="table table-borderless table-hover table-nowrap table-centered m-0">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Total Amount</th>
                  <th>Order Date</th>
                 
                </tr>
              </thead>
              <tbody>
                {(orders || []).map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <h5 className="m-0 fw-normal">{item.id}</h5>
                      </td>

                      <td>{item.customer_name}</td>

                      <td>{item.total_amount}</td>

                      <td>
                        <span
                      
                        >
                          {item.order_date}
                        </span>
                      </td>

                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
});

export default RevenueOrders;






