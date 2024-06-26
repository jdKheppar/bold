import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import "./Products.css";
// components
import PageTitle from "../../../../components/PageTitle";


interface ProductItemTypes {
    id: number;
    title: string;
    image: string;
    rating: number;
    price: number;
    wholesale_price: number;
    current_stock: number;
}

// main component
const ProductsList = () => {
    const [products, setProducts] = useState<Array<ProductItemTypes>>([]);
    const [titleText, setTitleText] = useState("");
    let exchangeOrderItem = localStorage.getItem("ExchangeOrderID");
    /*
     * search product by name
     */
    const searchProduct = (value: string) => {
        let initialProducts = products;
        if (value === "") setProducts(initialProducts);
        else {
            var modifiedProducts = products;
            modifiedProducts = modifiedProducts.filter((item) =>
                item.title.toLowerCase().includes(value)
            );
            setProducts(modifiedProducts);
        }
    };
    const getProducts = async () => {

        const fullUrl = "https://reseller.whitexdigital.com/api/products";
        try {
            let response = await axios.get(fullUrl);
            setProducts(response.data.data);
        } catch (error) {
            console.error("API call error:", error);
            throw error;
        }
    }
    useEffect(() => {
        getProducts();
        if (exchangeOrderItem) {
            setTitleText(`Product Catalog (Select Items For Exchange Order)`);
        }
        else {
            setTitleText("Product Catelog");
        }
    }, []);

    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: "Products", path: "" },
                    { label: "Products", path: "/apps/orders", active: true },
                ]}
                title={titleText}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row className="justify-content-between">
                                <Col className="col-auto">
                                    <form className="d-flex flex-wrap align-items-center">
                                        <label htmlFor="inputPassword2" className="visually-hidden">
                                            Search
                                        </label>
                                        <div className="me-3">
                                            <input
                                                type="search"
                                                className="form-control my-1 my-lg-0"
                                                id="inputPassword2"
                                                placeholder="Search..."
                                                onChange={(e: any) => searchProduct(e.target.value)}
                                            />
                                        </div>
                                        <label htmlFor="status-select" className="me-2">
                                            Sort By
                                        </label>
                                        <div className="me-sm-3">
                                            <select
                                                className="form-select my-1 my-lg-0"
                                                id="status-select"
                                            >
                                                <option defaultValue="all">All</option>
                                                <option value="popular">Popular</option>
                                                <option value="pricelow">Price Low</option>
                                                <option value="pricehigh">Price High</option>
                                                <option value="soldout">Sold Out</option>
                                            </select>
                                        </div>
                                    </form>
                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                {(products || []).map((product, index) => {
                    return (
                        <Col key={index} md={6} xl={3}>
                            <Card className="product-box">
                                <Card.Body>

                                    <div className="bg-light product-image-container">
                                        <img src={product.image} alt="" className="product-image" />
                                    </div>
                                    
                                    <div className="product-info">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h5 className="font-16 mt-0 sp-line-1">
                                                    <Link
                                                        to={`/apps/products/${product.id}`}
                                                        className="text-dark"
                                                    >
                                                        {product.title}
                                                    </Link>
                                                </h5>
                                                <div className="text-warning mb-2 font-13">
                                                    <i className="fa fa-star me-1"></i>
                                                    <i className="fa fa-star me-1"></i>
                                                    <i className="fa fa-star me-1"></i>
                                                    <i className="fa fa-star me-1"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <h5 className="m-0">
                                                    {" "}
                                                    <span className="text-muted">
                                                        {" "}
                                                        Stocks : {product.current_stock} pcs
                                                    </span>
                                                </h5>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-dark"> Market Price</div>

                                                <div className="product-price-tag">
                                                    ${product.price}
                                                </div>
                                                <div className="text-dark">Wholesale Price</div>

                                                <div className="product-price-tag">
                                                    ${product.wholesale_price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            <Row>
                <Col>
                    <ul className="pagination pagination-rounded justify-content-end mb-3">
                        <li className="page-item">
                            <Link className="page-link" to="#" aria-label="Previous">
                                <span aria-hidden="true">«</span>
                                <span className="visually-hidden">Previous</span>
                            </Link>
                        </li>
                        <li className="page-item active">
                            <Link className="page-link" to="#">
                                1
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link className="page-link" to="#">
                                2
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link className="page-link" to="#">
                                3
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link className="page-link" to="#">
                                4
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link className="page-link" to="#">
                                5
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link className="page-link" to="#" aria-label="Next">
                                <span aria-hidden="true">»</span>
                                <span className="visually-hidden">Next</span>
                            </Link>
                        </li>
                    </ul>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ProductsList;
