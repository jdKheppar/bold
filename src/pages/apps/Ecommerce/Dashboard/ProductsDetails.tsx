import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import classNames from "classnames";
import axios from "axios";


interface ProductItemTypes {
  id: number;
  title: string;
  image: string;
  rating: number;
  price: number;
  wholesale_price: number;
  current_stock: number;
}

const ProductsDetails = () => {
  const [products, setProducts] = useState<Array<ProductItemTypes>>([]);

  /*
   * search product by name
   */

  const getProducts = async () => {

    const fullUrl = "https://reseller.whitexdigital.com/api/products";
    try {
      let response = await axios.get(fullUrl);
      setProducts(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  }
  useEffect(() => {
    getProducts();
  }, []);


  return (
    <>
      <Card>
        <Card.Body>
          <h4 className="header-title mb-3">Recent Products</h4>

          <div className="table-responsive">
            <table className="table table-centered table-nowrap table-hover mb-0">
              <thead>
                <tr>
                  <th className="border-top-0">Product</th>
                  <th className="border-top-0">price</th>
                  <th className="border-top-0">Wholesale Price</th>
                  <th className="border-top-0">Current_stock</th>
                </tr>
              </thead>
              <tbody>
                {(products || []).map((product, index) => {

                  return (
                    <tr key={index}>
                      <td>
                        <img src={product.image} alt="" height="36" />
                        <span className="ms-2">{product.title}</span>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.wholesale_price}</td>
                      <td>{product.current_stock}</td>

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
};

export default ProductsDetails;
