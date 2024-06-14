import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";
import axios from "axios";

// components
import PageTitle from "../../../../../components/PageTitle";
import Rating from "../../../../../components/Rating";

interface Product {
  brand: string;
  title?: string;
  reviews: string[];
  status: string;
  special_discount: number;
  discount_price: number;
  price: number;
  wholesale_price: number;
  description: string;
  rating: number;
  current_stock: number;
  total_images: number;
  images: string[];
  details: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<Product | null>(null);

  const getProductDetails = async () => {
    const fullUrl = `https://reseller.whitexdigital.com/api/product_detail/${id}`;
    try {
      const response = await axios.get(fullUrl);
      setProductDetails(response.data.data);
      console.log(response);
      return response;
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };
  const fetchClients = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/client/";
    try {
      const response = await axios.get(fullUrl);
      setProductDetails(response.data.data);
      console.log(response);
      return response;
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  const renderImages = () => {
    return productDetails.images.map((image, index) => (
      <Nav.Item as="li" key={index}>
        <Nav.Link
          eventKey={`product-${index + 1}-item`}
          className="product-thumb cursor-pointer"
        >
          <img
            src={image}
            alt={`Product ${index + 1}`}
            className="img-fluid mx-auto d-block rounded"
          />
        </Nav.Link>
      </Nav.Item>
    ));
  };

  const renderImageTabs = () => {
    return productDetails.images.map((image, index) => (
      <Tab.Pane eventKey={`product-${index + 1}-item`} key={index}>
        <img
          src={image}
          alt={`Product ${index + 1}`}
          className="img-fluid mx-auto d-block rounded"
        />
      </Tab.Pane>
    ));
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Ecommerce", path: "/apps/ecommerce/details" },
          {
            label: "Product Detail",
            path: "/apps/ecommerce/details",
            active: true,
          },
        ]}
        title={"Product Detail"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={5}>
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="product-1-item"
                  >
                    <Tab.Content className="p-0">
                      {renderImageTabs()}
                    </Tab.Content>

                    <Nav variant="pills" as="ul" className="nav nav-justified">
                      {renderImages()}
                    </Nav>
                  </Tab.Container>
                </Col>

                <Col lg={7}>
                  <div className="ps-xl-3 mt-3 mt-xl-0">
                    <h4 className="mb-3">{productDetails.title}</h4>
                    <Rating value={productDetails.rating} />
                    <p className="mb-4">
                      <Link to="#" className="text-muted">
                        ( {productDetails.reviews.length} Customer Reviews )
                      </Link>
                    </p>
                    <h6 className="text-danger text-uppercase">
                      {productDetails.special_discount}% Off
                    </h6>
                    <h4 className="mb-4">
                      Price :{" "}
                      <span className="text-muted me-2">
                        <del>${productDetails.price} USD</del>
                      </span>{" "}
                      <b>${productDetails.discount_price} USD</b>
                    </h4>

                    <h4>
                      <span className="badge bg-soft-success text-success mb-4">
                        {productDetails.details}
                      </span>
                    </h4>

                    <p className="text-muted mb-4">{productDetails.description}</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
