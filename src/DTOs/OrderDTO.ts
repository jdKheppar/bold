export interface Product {
    id: number;
    image_url: string;
}

export interface OrdersDTO {
    id: number;
    products: Array<Product>;
    customer_name: string;
    total_amount: number;
    order_date: string;
    order_time: string;
    status: string; // order_status
    file: string;
    pro_det: {
        id: number;
        slug: string;
        quantity: number;
        price: number;
        image_ur: string;
    }[];
}
