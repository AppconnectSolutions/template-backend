import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products?status=Active`);
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <>
      <style>{`
        .product-card { width: 100%; max-width: 340px; border-radius: 16px; overflow: hidden; border: 1px solid #e0e0e0; transition: 0.3s ease; cursor: pointer; background: #fff; }
        .product-card:hover { box-shadow: 0 8px 22px rgba(0,0,0,0.15); }
        .product-img-container { width: 100%; height: 330px; overflow: hidden; position: relative; border-bottom: 1px solid #ddd; }
        .product-img-container img { width: 100%; height: 100%; object-fit: cover; position: absolute; opacity: 0; transition: opacity 0.4s ease-in-out; }
        .product-img-container img.main-img { opacity: 1; }
        .product-card:hover .hover-1 { opacity: 1; }
        .product-card:hover .hover-2 { animation: fadeSlide 1.4s forwards 0.4s; }
        @keyframes fadeSlide { from { opacity: 0; } to { opacity: 1; } }
        .add-btn { background: #5b7f2b; color: white; border-radius: 6px; padding: 8px 16px; border: none; font-weight: 600; }
        .add-btn:hover { background: #4a6a22; }
      `}</style>

      <Container className="my-5">
        <h2 className="fw-bold text-center mb-4" style={{ color: "#1f3b2f", fontSize: "32px" }}>
          Our Products
        </h2>

        <Row className="g-4 justify-content-center">
          {products.map((product) => {
            const firstVariant = product.variants?.[0];

            return (
              <Col
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="d-flex justify-content-center"
              >
                <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="product-img-container">
                    <img src={`${API_URL}/uploads/${product.image1}`} className="main-img" />
                    <img
                      src={`${API_URL}/uploads/${product.image2 || product.image1}`}
                      className="hover-1"
                    />
                    <img
                      src={`${API_URL}/uploads/${product.image3 || product.image1}`}
                      className="hover-2"
                    />
                  </div>

                  <div className="p-3">
                    <h6 className="fw-bold" style={{ minHeight: "40px" }}>
                      {product.title}
                      {product.units && (
                        <span className="text-muted" style={{ fontSize: "14px", marginLeft: "10px" }}>
                          – Pack of ({product.units})
                        </span>
                      )}
                    </h6>

                    {firstVariant && (
                      <div>
                        <span className="text-muted text-decoration-line-through me-2">
                          ₹{firstVariant.price}
                        </span>
                        <span className="fw-bold">From ₹{firstVariant.sale_price || firstVariant.price}</span>
                      </div>
                    )}

                    <div className="mt-2 d-flex align-items-center">
                      <span style={{ color: "#ffcc00" }}>★★★★☆</span>
                      <span className="ms-2">4.4</span>
                    </div>

                    <button className="add-btn w-100 mt-3">ADD TO CART</button>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

