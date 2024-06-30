import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Tab, Nav, Badge } from "react-bootstrap";
import axios from "axios";
import { withSwal } from "react-sweetalert2";


// components
import PageTitle from "../../../../../components/PageTitle";
import Rating from "../../../../../components/Rating";

// Define the Product interface
interface Product {
  title: string;
  special_discount_type: string;
  special_discount: number;
  discount_price: number;
  price: number;
  wholesale_price: number;
  rating: number;
  total_reviews: number;
  current_stock: number;
  minimum_order_quantity: number;
  reward: number;
  total_images: number;
  images: string[];
  colors: string[];
  attributes: string[];
  special_discount_start: string;
  special_discount_end: string;
  description: string;
  details: string;
  is_favourite: boolean;
  short_description: string;
  has_variant: boolean;
  is_wholesale: boolean;
  is_catalog: boolean;
  is_featured: boolean;
  is_classified: boolean;
  is_digital: boolean;
  is_refundable: boolean;
  description_images: string[];
  specifications: string;
  reviews: string[];
  is_reviewed: boolean;
  delivery: string;
  return: number;
  stock_visibility: string;
  wholesale_prices: string[];
  classified_contact_info: any;
  catalog_external_link: string;
  form: {
    product_id: number;
    quantity: number;
  };
  links: {
    facebook: string;
    twitter: string;
    linkedin: string;
    whatsapp: string;
  };
}
//const SweetAlerts = withSwal((props: any) => {
const ProductDetails = withSwal((props: any) => {
  const { swal } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  let exchangeOrderItem = localStorage.getItem("ExchangeOrderID");

  const [titleText, setTitleText] = useState("");

  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const addToCart = () => {
    // Ensure id is defined and convert it to number
    const productId = Number(id); // This assumes id is always defined and can be converted to a number

    if (isNaN(productId)) {
      console.error("Invalid product ID:", id);
      return;
    }

    // Filter out any undefined or invalid IDs from cartItems
    const filteredCartItems = cartItems.filter(item => typeof item === 'number') as number[];

    // Check if the product ID is already in the cartItems array
    if (filteredCartItems.includes(productId)) {
      swal.fire({
        title: "Error!",
        text: "Product is already in the cart.",
        icon: "error",
      });

      return; // Exit function if product ID is already in cart
    }

    // Add product ID to cartItems state
    const updatedCart = [...filteredCartItems, productId];
    setCartItems(updatedCart);

    // Update localStorage with updated cartItems
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // Show success message to user
    swal.fire({
      title: "Success!",
      text: "Product added successfully to the cart!",
      icon: "success",
    });
    // navigate("/apps/shoppingcart");
    return;
  };


  const getProductDetails = async () => {
    const fullUrl = `https://reseller.whitexdigital.com/api/product_detail/${id}`;
    try {
      const response = await axios.get(fullUrl);
      setProductDetails(response.data.data);
      return response;
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };
  function createMarkup(text: any) { return { __html: text }; };
  useEffect(() => {
    getProductDetails();
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [id]);

  useEffect(() => {
    if (exchangeOrderItem) {
      setTitleText(`Product Detail (Select Item For Exchange Order)`);
    }
    else {
      setTitleText("Product Detail");
    }
  })
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
        title={titleText}
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
                      Market Price:{" "}
                      <span className="text-muted me-2">
                        <del>${productDetails.price} USD</del>
                      </span>{" "}
                      <b>${productDetails.discount_price} USD</b>
                    </h4>
                    <h4 className="mb-4">
                      Wholesale Price:{" "}
                      <span className="text-muted me-2">
                        ${productDetails.wholesale_price} USD
                      </span>
                    </h4>

                    <h5 className="mb-4">
                      <Badge bg="success" className="me-1">
                        {productDetails.short_description}
                      </Badge>
                      {productDetails.is_favourite && (
                        <Badge bg="danger" className="me-1">
                          Favourite
                        </Badge>
                      )}
                      {productDetails.has_variant && (
                        <Badge bg="info" className="me-1">
                          Has Variant
                        </Badge>
                      )}
                      {productDetails.is_wholesale && (
                        <Badge bg="warning" className="me-1">
                          Wholesale
                        </Badge>
                      )}
                      {productDetails.is_catalog && (
                        <Badge bg="primary" className="me-1">
                          Catalog
                        </Badge>
                      )}
                      {productDetails.is_featured && (
                        <Badge bg="secondary" className="me-1">
                          Featured
                        </Badge>
                      )}
                    </h5>

                    <div dangerouslySetInnerHTML={createMarkup(productDetails.details)} />


                    <Row>
                      <Col md={6}>
                        <h5>Product Details</h5>
                        <ul className="list-unstyled">
                          <li>Current Stock: {productDetails.current_stock}</li>
                          <li>Minimum Order Quantity: {productDetails.minimum_order_quantity}</li>
                          <li>Reward: {productDetails.reward}</li>
                          <li>Delivery: {productDetails.delivery}</li>
                          <li>Return: {productDetails.return}</li>
                        </ul>
                      </Col>
                      <Col md={6}>
                        <h5>Specifications</h5>
                        <p>{productDetails.specifications}</p>
                      </Col>
                    </Row>

                    <div className="mt-4">
                      <Link
                        to="/apps/shoppingcart"
                        className="btn btn-danger me-2"
                      >
                        <i className="mdi mdi-cart-plus me-1"></i> Order{" "}
                      </Link>

                      <button
                        type="button"
                        className="btn btn-success waves-effect waves-light"
                        id="sa-success"
                        onClick={addToCart}
                      >
                        <span className="btn-label">
                          <i className="mdi mdi-cart"></i>
                        </span>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});

export default ProductDetails;
