import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import "./Products.css";
import { withSwal } from "react-sweetalert2";
// components
import PageTitle from "../../../../components/PageTitle";

interface ProductItemTypes {
  id: number;
  slug: string;
  title: string;
  image: string;
  rating: number;
  price: number;
  wholesale_price: number;
  current_stock: number;
  category: string;
}

// main component
const ProductsList = () => {
  const [products, setProducts] = useState<Array<ProductItemTypes>>([]);
  const [filteredProducts, setFilteredProducts] = useState<Array<ProductItemTypes>>([]);
  const [titleText, setTitleText] = useState("");
  let exchangeOrderItem = localStorage.getItem("ExchangeOrderID");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  /*
   * search product by category
   */
  const searchProduct = (category: string) => {
    if (category === "all") {
        getProducts();
    } else {
        let filteredProducts = products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
        setProducts(filteredProducts);
    }
};


  const filterByPrice = () => {
    let filtered = products;
    if (minPrice !== null && maxPrice !== null) {
      filtered = filtered.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  };

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const filterByStockStatus = (status: string) => {
    let filteredProducts = [...products];

    switch (status) {
        case 'instock':
            filteredProducts = products.filter(product => product.current_stock > 0);
            break;
        case 'outofstock':
            filteredProducts = products.filter(product => product.current_stock === 0);
            break;
        default:
            // Show all products for 'all' option or any unexpected value
            break;
    }

    setFilteredProducts(filteredProducts);
};

  const getProducts = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/products";
    try {
      let response = await axios.get<{ data: ProductItemTypes[] }>(fullUrl);
      setProducts(response.data.data);
      setFilteredProducts(response.data.data);
      const uniqueCategories = Array.from(new Set(categories)).filter(category => category);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };

  useEffect(() => {
    getProducts();
    if (exchangeOrderItem) {
      setTitleText(`Product Catalog (Select Items For Exchange Order)`);
    } else {
      setTitleText("Product Catalog");
    }
  }, []);

  useEffect(() => {
    filterByPrice();
  }, [minPrice, maxPrice, selectedCategory]);

  const renderStars = (rating: number) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    const emptyStars = totalStars - filledStars;

    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <i key={index} className="fa fa-star text-warning me-1"></i>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <i key={index} className="fa fa-star text-muted me-1"></i>
        ))}
      </>
    );
  };

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Products", path: "" },
          { label: "Products", path: "/apps/products", active: true },
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
                    <label htmlFor="inputSearch" className="visually-hidden">
                      Search
                    </label>
                    <div className="me-3">
                      <input
                        type="search"
                        className="form-control my-1 my-lg-0"
                        id="inputSearch"
                        placeholder="Search any category..."
                        onChange={(e: any) => searchProduct(e.target.value)}
                      />
                    </div>
                    <label htmlFor="category-select" className="me-2">
                      Sort By Category
                    </label>
                    <div className="me-sm-3">
                      <select
                        className="form-select my-1 my-lg-0"
                        id="category-select"
                        onChange={(e: any) => filterByCategory(e.target.value)}
                      >
                        <option value="all">All</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                </Col>
              </Row>
              <Row className="justify-content-between mt-3">
                <Col className="col-auto">
                  <form className="d-flex flex-wrap align-items-center">
                    <label htmlFor="minPrice" className="me-2">
                      Enter Price Range
                    </label>
                    <div className="me-3">
                      <input
                        type="number"
                        className="form-control my-1 my-lg-0"
                        id="minPrice"
                        placeholder="MIN"
                        value={minPrice ?? ""}
                        onChange={(e: any) => setMinPrice(Number(e.target.value))}
                      />
                    </div>
                    <div className="me-3">
                      <input
                        type="number"
                        className="form-control my-1 my-lg-0"
                        id="maxPrice"
                        placeholder="MAX"
                        value={maxPrice ?? ""}
                        onChange={(e: any) => setMaxPrice(Number(e.target.value))}
                      />
                    </div>
                    <Button onClick={filterByPrice}>Apply</Button>
                  </form>
                </Col>
              </Row>
              <Row className="justify-content-between mt-3">
    <Col className="col-auto">
        <form className="d-flex flex-wrap align-items-center">
            <label htmlFor="status-select" className="me-2">Stock Status</label>
            <div className="me-sm-3">
                <select
                    className="form-select my-1 my-lg-0"
                    id="stock-select"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => filterByStockStatus(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="instock">In Stock</option>
                    <option value="outofstock">Out of Stock</option>
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
        {(filteredProducts || []).map((product, index) => {
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
                          <Link to={`/apps/products/${product.slug}`} className="text-dark">
                            {product.title}
                          </Link>
                        </h5>
                        <div className="mb-2 font-13">
                          {renderStars(product.rating)}
                        </div>
                        <h5 className="m-0">
                          <span className="text-muted"> Stocks : {product.current_stock} pcs</span>
                        </h5>
                      </div>
                      <div className="col-auto">
                        <div className="text-dark">Wholesale Price</div>
                        <div className="product-price-tag">${product.wholesale_price}</div>
                        <div className="text-dark">Suggested Retail Price</div>
                        <div className="product-price-tag">${product.price}</div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export default ProductsList;
