
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


