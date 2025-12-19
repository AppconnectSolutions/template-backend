import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const cardWrapperStyle = {
    width: "100%",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
  };

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products?status=Active`);
        if (res.data.success && Array.isArray(res.data.products)) {
          setProducts(res.data.products.slice(0, 6)); // show more products
        }
      } catch (err) {
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <h3>Loading Products...</h3>
      </Container>
    );
  }

  if (!products.length) {
    return (
      <Container className="text-center my-5">
        <h3>No products available.</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h3 className="mb-4 text-center">Featured Products</h3>

      <Row className="g-4 justify-content-center">
        {products.map((product) => {
          const firstVariant = product.variants?.[0];

          return (
            <Col
              key={product.id}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className="d-flex justify-content-center"
            >
              <div style={cardWrapperStyle}>
                <ProductCard
                  product={{
                    name: product.title,
                    price: firstVariant?.sale_price || firstVariant?.price || 0,
                    rating: 5,
                    imageFront: `${API_URL}/uploads/${product.image1}`,
                    imageMiddle: `${API_URL}/uploads/${product.image2 || product.image1}`,
                    imageBack: `${API_URL}/uploads/${product.image3 || product.image1}`,
                  }}
                  apiUrl={API_URL}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
