import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Card, ProgressBar, Tab, Nav } from "react-bootstrap";
import axios from "axios";
import PageTitle from "../../../../../components/PageTitle";
import Rating from "../../../../../components/Rating";

interface Product {
  name: string;
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
  short_description: string;
  long_description: string;
  details: string;
  is_favourite: boolean;
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
  gallery: {
    large: string[],
    small: string[]
  };
  category_name: string;
}

interface CartItems {
  slug: string;
  quantity: number;
}

const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { slug } = useParams<{ slug: string }>();

  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [currentItem, setCurrentItem] = useState<CartItems>({
    slug: slug || "",
    quantity: 1,
  });

  const addToCart = () => {
    if (!slug) {
      console.error("Invalid product slug:", slug);
      return;
    }

    const isInCart = cartItems.some(item => item.slug === slug);

    if (isInCart) {
      // Handle item already in cart (e.g., show a message)
      return;
    }

    const updatedCart = [...cartItems, { slug, quantity: currentItem.quantity }];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const getProductDetails = async () => {
    const fullUrl = `https://reseller.whitexdigital.com/api/product_detail/${slug}`;
    try {
      const response = await axios.get(fullUrl);
      setProduct(response.data);
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  const current_stockClass = product?.current_stock && product.current_stock > 0 ? "success" : "danger";

  const createMarkup = (text: string) => ({ __html: text });

  useEffect(() => {
    getProductDetails();
  }, [slug]);

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Ecommerce", path: "/apps/ecommerce/details" },
          { label: "Product Detail", path: "/apps/ecommerce/details", active: true },
        ]}
        title="Product Detail"
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={5}>
                  <Tab.Container id="left-tabs-example" defaultActiveKey="product-1-item">
                    <Tab.Content className="p-0">
                      {product?.gallery.large[0] && (
                        <Tab.Pane eventKey="product-1-item">
                          <img
                            src={product.gallery.large[0]}
                            alt=""
                            className="img-fluid mx-auto d-block rounded"
                          />
                        </Tab.Pane>
                      )}
                      {product?.gallery.large[1] && (
                        <Tab.Pane eventKey="product-2-item">
                          <img
                            src={product.gallery.large[1]}
                            alt=""
                            className="img-fluid mx-auto d-block rounded"
                          />
                        </Tab.Pane>
                      )}
                      {product?.gallery.large[2] && (
                        <Tab.Pane eventKey="product-3-item">
                          <img
                            src={product.gallery.large[2]}
                            alt=""
                            className="img-fluid mx-auto d-block rounded"
                          />
                        </Tab.Pane>
                      )}
                      {product?.gallery.large[3] && (
                        <Tab.Pane eventKey="product-4-item">
                          <img
                            src={product.gallery.large[3]}
                            alt=""
                            className="img-fluid mx-auto d-block rounded"
                          />
                        </Tab.Pane>
                      )}
                    </Tab.Content>

                    <Nav variant="pills" as="ul" className="nav nav-justified">
                      {product?.gallery.small[0] && (
                        <Nav.Item as="li">
                          <Nav.Link eventKey="product-1-item" className="product-thumb cursor-pointer">
                            <img
                              src={product.gallery.small[0]}
                              alt=""
                              className="img-fluid mx-auto d-block rounded"
                            />
                          </Nav.Link>
                        </Nav.Item>
                      )}
                      {product?.gallery.small[1] && (
                        <Nav.Item as="li">
                          <Nav.Link eventKey="product-2-item" className="product-thumb cursor-pointer">
                            <img
                              src={product.gallery.small[1]}
                              alt=""
                              className="img-fluid mx-auto d-block rounded"
                            />
                          </Nav.Link>
                        </Nav.Item>
                      )}
                      {product?.gallery.small[2] && (
                        <Nav.Item as="li">
                          <Nav.Link eventKey="product-3-item" className="product-thumb cursor-pointer">
                            <img
                              src={product.gallery.small[2]}
                              alt=""
                              className="img-fluid mx-auto d-block rounded"
                            />
                          </Nav.Link>
                        </Nav.Item>
                      )}
                      {product?.gallery.small[3] && (
                        <Nav.Item as="li">
                          <Nav.Link eventKey="product-4-item" className="product-thumb cursor-pointer">
                            <img
                              src={product.gallery.small[3]}
                              alt=""
                              className="img-fluid mx-auto d-block rounded"
                            />
                          </Nav.Link>
                        </Nav.Item>
                      )}
                    </Nav>
                  </Tab.Container>
                </Col>

                <Col lg={7}>
                  <div className="ps-xl-3 mt-3 mt-xl-0">
                    {product?.category_name && (
                      <Link to="#" className="text-primary">
                        {product.category_name}
                      </Link>
                    )}
                    <h4 className="mb-3">{product?.name}</h4>
                    <Rating value={product?.rating} />
                    {product?.total_reviews && (
                      <p className="mb-4">
                        <Link to="#" className="text-muted">
                          ({product.total_reviews} Customer Reviews)
                        </Link>
                      </p>
                    )}
                    <h4 className="mb-4">
                      Price: <b>${product?.price} BDT</b>
                    </h4>
                    {product?.current_stock !== undefined && (
                      <h4>
                        <span className={`badge bg-soft-${current_stockClass} text-${current_stockClass} mb-4`}>
                          {product.current_stock > 0 ? "In stock" : "Out of stock"}
                        </span>
                      </h4>
                    )}
                    <p className="text-muted mb-4">{product?.short_description}</p>
                    <form className="d-flex flex-wrap align-items-center mb-4">
                      <label className="my-1 me-2" htmlFor="quantityinput">
                        Quantity
                      </label>
                      <div className="me-3">
                        <select
                          className="form-select my-1"
                          id="quantityinput"
                          value={currentItem.quantity}
                          onChange={(e) => setCurrentItem({ ...currentItem, quantity: Number(e.target.value) })}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </select>
                      </div>
                    </form>
                    <div>
                      <button
                        type="button"
                        className="btn btn-success waves-effect waves-light"
                        onClick={addToCart}
                      >
                        <span className="btn-label">
                          <i className="mdi mdi-cart"></i>
                        </span>
                        Add to cart
                      </button>
                    </div>
                    <div className="text-muted mb-4 mt-4">
                      <div dangerouslySetInnerHTML={createMarkup(product?.long_description || "")} />
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
};

export default ProductDetails;
