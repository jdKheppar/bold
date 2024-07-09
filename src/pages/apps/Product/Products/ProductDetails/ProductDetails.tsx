import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Card, ProgressBar, Tab, Nav } from "react-bootstrap";
import axios from "axios";
import PageTitle from "../../../../../components/PageTitle";
import Rating from "../../../../../components/Rating";
import { FormInput } from "../../../../../components";
import { withSwal } from "react-sweetalert2";


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
  variations: {
    current_stock: string,
    id: number,
    image: string,
    name: string,
    product_id: number,
    sku: string,
    suggested_retail_price: number,
    variant_ids: string
  };
  product_colors: {
    id: number,
    code: string,
    name: string
  }[];
}
interface Color {
  id: number;
  code: string;
  name: string;
}

interface CartItems {
  slug: string;
  quantity: number;
}

const ProductDetails: React.FC = withSwal((props: any) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const { swal } = props;
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [titleText, setTitleText] = useState("");
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  let exchangeOrderItem = localStorage.getItem("ExchangeOrderID");


  const [currentItem, setCurrentItem] = useState<CartItems>({
    slug: slug || "",
    quantity: 0,
  });

  const addToCart = () => {

    if (!slug) {
      swal.fire({
        title: "Error!",
        text: "Invalid Product Slug",
        icon: "error",
      });
      return;
    }
    if (currentItem.quantity === 0) {
      swal.fire({
        title: "Error!",
        text: "Quantity cannot be zero",
        icon: "error",
      });
      return;
    }

    const isInCart = cartItems.some(item => item.slug === slug);//we can add size here instead of the quantity && item.quantity === currentItem.quantity


    if (isInCart) {
      swal.fire({
        title: "Error!",
        text: "Product is already in the cart.",
        icon: "waring",
      });
      return;
    }

    const updatedCart = [...cartItems, { slug, quantity: currentItem.quantity }];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    swal.fire({
      title: "Success!",
      text: "Product added successfully.",
      icon: "success",
    });
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
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [slug]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart();
  };

  useEffect(() => {
    if (exchangeOrderItem) {
      setTitleText(`Product Details (Exchange Order)`);
    }
    else {
      setTitleText("Product Details");
    }
  })
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Ecommerce", path: "/apps/ecommerce/details" },
          { label: "Product Detail", path: "/apps/ecommerce/details", active: true },
        ]}
        title={titleText}
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
                    <h6 className="text-danger text-uppercase" >
                      Discount Price: {product?.price}
                    </h6>
                    <h4 className="mb-4">
                      Price :{" "}
                      <span className="text-muted me-2">
                        <del>{product?.price} BDT</del>
                      </span>{" "}
                      <b>{product?.price} BDT</b>

                    </h4>

                    {product?.current_stock !== undefined && (
                      <h4>
                        <span className={`badge bg-soft-${current_stockClass} text-${current_stockClass} mb-4`}>
                          {product.current_stock > 0 ? "In stock" : "Out of stock"}
                        </span>
                      </h4>
                    )}
                    <div>
                      <select onChange={(event) => {
                          const selectedColor = product?.product_colors.find(color => color.id === Number(event.target.value));
                          setSelectedColor(selectedColor || null);
                        }} value={selectedColor?.id || ""}>
                        <option value="">Select a color</option>
                        {product?.product_colors.map((color, index) => (
                          <option key={index} value={color.id} style={{ color: color.code }}>
                            {color.name}
                          </option>
                        ))}
                      </select>
                      {selectedColor && (
                        <div style={{ marginTop: '20px', color: selectedColor.code }}>
                          Selected Color: {selectedColor.name}
                        </div>
                      )}
                    </div>
                    <p className="text-muted mb-4">{product?.short_description}</p>
                    <form className=" mb-4" onSubmit={handleSubmit}>
                      {/* <label className="my-1 me-2" htmlFor="quantityinput">
                        Quantity
                      </label> */}
                      <div className="d-flex flex-wrap align-items-center">
                        <div className="me-3">
                          <FormInput
                            label="Quantity"
                            type="number"
                            name="number"
                            min={0}
                            max={product?.current_stock}
                            placeholder="Enter stocks for the product"
                            containerClass={"mb-3"}
                            id="quantityinput"
                            value={currentItem.quantity}
                            onChange={(e) => setCurrentItem({ ...currentItem, quantity: Number(e.target.value) })}
                            key="number"
                            disabled={!product?.current_stock}

                          />

                        </div>
                        <label className="my-1 me-2" htmlFor="sizeinput">
                          Size
                        </label>
                        <div className="me-sm-3">
                          <select className="form-select my-1" id="sizeinput">
                            <option defaultValue="0">Small</option>
                            <option value="1">Medium</option>
                            <option value="2">Large</option>
                            <option value="3">X-large</option>
                          </select>
                        </div>
                      </div>


                      <div>
                        <button
                          className="btn btn-success waves-effect waves-light"
                          type="submit"
                          disabled={!product?.current_stock}
                        >
                          <span className="btn-label">
                            <i className="mdi mdi-cart"></i>
                          </span>
                          Add to cart
                        </button>
                      </div>
                    </form>


                  </div>
                </Col>
                <div className="text-muted mb-4 mt-4">
                  <div dangerouslySetInnerHTML={createMarkup(product?.long_description || "")} />
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row >
    </>
  );
});

export default ProductDetails;
