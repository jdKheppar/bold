import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";
import axios from "axios";
import PageTitle from "../../../../../components/PageTitle";
import Rating from "../../../../../components/Rating";
import { FormInput } from "../../../../../components";
import { withSwal } from "react-sweetalert2";
import { CartItems } from "../../../../../DTOs/CartDTO";
import "./../Products.css";

interface Product {
  id: number;
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
    large: string[];
    small: string[];
  };
  category_name: string;
  variations: {
    current_stock: string;
    id: number;
    image: string;
    name: string;
    product_id: number;
    sku: string;
    suggested_retail_price: number;
    variant_ids: string;
    wholesale_price: number;
  }[];
  product_colors: {
    id: number;
    code: string;
    name: string;
  }[];
  suggested_retail_price: number;
  attributes: {
    id: number;
    title: string;
    values: {
      id: number;
      attribute_id: number;
      value: string;
    }[];
  }[];
}

interface Color {
  id: number;
  code: string;
  name: string;
}


const ProductDetails: React.FC = withSwal((props: any) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const { swal } = props;
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [titleText, setTitleText] = useState("");
  const [selectedColor, setSelectedColor] = useState<Color | null>({
    id: 0,
    code: "",
    name: ""
  });
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: number]: string }>({});
  const [selectedvariations, setSelectedVariations] = useState<string>("");
  const [selectedvariationame, setSelectedVariationName] = useState<string>("");
  let exchangeOrderItem = localStorage.getItem("ExchangeOrderID");

  const [currentItem, setCurrentItem] = useState<CartItems>({
    id: 0,
    quantity: 0,
    color_id: 0,
    attribute_values: [],
    variants_ids: "",
    price: 0,
    custom_price: 0,
    variants_name: "",
    image: "",
    slug: "",
    name: "",
    total: 0
  });


  useEffect(() => {
    let rst = selectedColor?.id.toString() || "";
    Object.values(selectedAttributes).forEach((attrId) => {
      rst += `-${attrId}`;
    });
    setSelectedVariations(rst);
  }, [selectedColor, selectedAttributes]);

  useEffect(() => {
    product?.variations.forEach((variation) => {
      if (variation.variant_ids === selectedvariations) {
        setSelectedVariationName(variation.name)
        setProduct((prev) => prev ? ({
          ...prev,
          current_stock: parseInt(variation.current_stock, 10),
          wholesale_price: variation.wholesale_price,
          suggested_retail_price: variation.suggested_retail_price
        }) : null);
      }
    });
  }, [selectedvariations]);

  const addToCart = () => {
    if (!slug) {
      swal.fire({
        title: "Error!",
        text: "Invalid Product Slug",
        icon: "error",
      });
      return;
    }
    console.log(currentItem?.quantity);
    if (!currentItem?.quantity) {
      swal.fire({
        title: "Error!",
        text: "Enter a valid quantity",
        icon: "error",
      });
      return;
    }
    let attributesIDs = Object.values(selectedAttributes).map((attrId) => parseInt(attrId));

    const isInCart = cartItems.some(
      (item) =>

        item.id == product?.id &&
        item.color_id == selectedColor?.id &&
        JSON.stringify(item.attribute_values) === JSON.stringify(attributesIDs)
    );

    if (product?.product_colors.length! > 0 && !selectedColor?.id) {
      swal.fire({
        title: "Error!",
        text: "Please select color.",
        icon: "warning",
      });
      return;
    }
    if (product?.attributes.length! > 0 && Object.keys(selectedAttributes).length !== product?.attributes.length) {
      swal.fire({
        title: "Error!",
        text: "Please select all attributes.",
        icon: "warning",
      });
      return;
    }
    if (isInCart) {
      swal.fire({
        title: "Error!",
        text: "Product is already in the cart.",
        icon: "warning",
      });
      return;
    }


    const updatedCart = [
      ...cartItems,
      {
        id: product?.id || 0,
        quantity: Number(currentItem.quantity),
        color_id: selectedColor?.id || 0,
        attribute_values: attributesIDs,
        variants_ids: selectedvariations,
        variants_name: selectedvariationame,
        price: Number(product?.wholesale_price!) || 0,

        custom_price: Number(product?.wholesale_price!) || 0,

        slug: slug,
        image: product?.gallery.small[0]!,
        name: product?.name!,
        total: Number(currentItem.quantity) * Number(product?.wholesale_price!)
      },
    ];
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
      setCurrentItem(response.data);
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  const current_stockClass =
    product?.current_stock && product.current_stock > 0 ? "success" : "danger";

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
    } else {
      setTitleText("Product Details");
    }
  });

  const handleAttributeChange = (attributeId: number, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeId]: value,
    }));
  };

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

                    {product?.suggested_retail_price && (
                      <h4 className="parentPrice">
                        <span className="childPrice">
                          Suggested Retail Price:{product.suggested_retail_price} BDT
                        </span>

                      </h4>
                    )}
                    {product?.suggested_retail_price && (
                      <h4>
                        <span>Wholesale Price:{product.wholesale_price} BDT</span>
                      </h4>
                    )}
                    {product?.current_stock !== undefined && (
                      <h4>
                        <span className={`badge bg-soft-${current_stockClass} text-${current_stockClass} mb-4`}>
                          {product.current_stock > 0 ? "In stock" : "Out of stock"}
                        </span>
                      </h4>
                    )}
                    <div>
                      <select
                        className="react-select react-select-container form-select"
                        onChange={(event) => {
                          const selectedColor = product?.product_colors.find(
                            (color) => color.id === Number(event.target.value)
                          );
                          setSelectedColor(selectedColor || null);
                        }}
                        value={selectedColor?.id || ""}
                      >
                        <option value="">Select a color</option>
                        {product?.product_colors.map((color, index) => (
                          <option key={index} value={color.id} style={{ color: color.code }}>
                            {color.name}
                          </option>
                        ))}
                      </select>
                      {selectedColor && (
                        <div
                          style={{
                            marginTop: "20px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: selectedColor.code,
                              marginRight: "10px",
                            }}
                          ></div>
                          <span style={{ color: selectedColor.code }}>Selected Color: {selectedColor.name}</span>
                        </div>
                      )}
                    </div>
                    {/* Dropdowns for each attribute */}
                    {product?.attributes.map((attribute) => (
                      <div key={attribute.id} className="mt-3">
                        <label htmlFor={`attribute-${attribute.id}`} className="form-label">
                          {attribute.title}
                        </label>
                        <select
                          id={`attribute-${attribute.id}`}
                          className="form-select"
                          onChange={(e) => handleAttributeChange(attribute.id, e.target.value)}
                          value={selectedAttributes[attribute.id] || ""}
                        >
                          <option value="">Select {attribute.title}</option>
                          {attribute.values.length > 0 && attribute.values.map((value) => (
                            <option key={value.id} value={value.id}>
                              {value.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                    <p className="text-muted mb-4">{product?.short_description}</p>
                    <form className="mb-4" onSubmit={handleSubmit}>
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
                            onChange={(e) =>
                              setCurrentItem({ ...currentItem, quantity: Number(e.target.value) })
                            }
                            key="number"
                            disabled={!product?.current_stock}
                          />
                        </div>

                      </div>

                      <div>
                        <button className="btn btn-success waves-effect waves-light" type="submit" disabled={!product?.current_stock}>
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
      </Row>
    </>
  );
});

export default ProductDetails;
