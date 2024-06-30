
export interface ProductItemTypes {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  quantity: number;
  status: boolean;
}

export interface OrdersItemTypes {
  id: number;
  product_img: Array<string>;
  order_id: string;
  order_date: string;
  order_time: string;
  payment_status: string;
  total: string;
  payment_method: string;
  order_status: string;
}


const orders: OrdersItemTypes[] = [
  {
    id: 1,
    product_img: ["", ""],
    order_id: "31",
    order_date: "23-May-2019",
    order_time: "1:45 PM",
    payment_status: "Payment Failed",
    total: "$8361.93",
    payment_method: "Visa",
    order_status: "Processing",
  },
  {
    id: 2,
    product_img: ["", "", ""],
    order_id: "060",
    order_date: "01-Feb-2019",
    order_time: "12:10 PM",
    payment_status: "Unpaid",
    total: "$6219.67",
    payment_method: "Credit Card",
    order_status: "Shipped",
  },
  {
    id: 3,
    product_img: [""],
    order_id: "76961",
    order_date: "13-Mar-2019",
    order_time: "2:53 AM",
    payment_status: "Payment Failed",
    total: "$6695.83",
    payment_method: "Paypal",
    order_status: "Shipped",
  },
  {
    id: 4,
    product_img: ["", ""],
    order_id: "59",
    order_date: "02-Feb-2019",
    order_time: "2:53 AM",
    payment_status: "Paid",
    total: "$8616.73",
    payment_method: "Visa",
    order_status: "Delivered",
  },
  {
    id: 5,
    product_img: ["", ""],
    order_id: "93",
    order_date: "15-May-2019",
    order_time: "1:52 PM",
    payment_status: "Awaiting Authorization",
    total: "$1808.61",
    payment_method: "Paypal",
    order_status: "Shipped",
  },

];



export { orders };
