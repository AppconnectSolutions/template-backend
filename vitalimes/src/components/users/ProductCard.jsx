import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export default function ProductCard({ product, apiUrl }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ---------------------- PRODUCT ID ----------------------
  const productId = product.id || product._id || product.product_id;

  // ---------------------- IMAGE HANDLING ----------------------
  const imageFront = product.image_url
    ? `${apiUrl}/uploads/${product.image_url}`
    : product.imageFront || "/assets/images/placeholder.png";
  const imageMiddle = product.image_url2
    ? `${apiUrl}/uploads/${product.image_url2}`
    : product.imageMiddle || imageFront;
  const imageBack = product.image_url3
    ? `${apiUrl}/uploads/${product.image_url3}`
    : product.imageBack || imageFront;

  // Hover effect images
  const images = [imageFront, imageMiddle, imageBack];
  const [hoverImageIndex, setHoverImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered || images.length <= 1) {
      setHoverImageIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setHoverImageIndex((prev) => (prev + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const currentImage = images[hoverImageIndex];

  // ---------------------- PRICE LOGIC ----------------------
  const price = Number(product.price);
  const salePrice =
    product.sale_price !== null && product.sale_price !== undefined
      ? Number(product.sale_price)
      : null;

  let offerPercent =
    product.offer_price !== null && product.offer_price !== undefined
      ? Number(product.offer_price)
      : null;

  if ((offerPercent === null || isNaN(offerPercent)) && salePrice !== null && salePrice < price) {
    offerPercent = Math.round(((price - salePrice) / price) * 100);
  }

  const hasDiscount = salePrice !== null && !isNaN(salePrice) && salePrice > 0 && salePrice < price;
  const rating = product.rating || 5;

  // ---------------------- REDIRECT ----------------------
  const goToDetails = () => {
    if (productId) navigate(`/product/${productId}`);
    else navigate("/products");
  };

  // ---------------------- ADD TO CART ----------------------
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: productId,
      title: product.name || product.title,
      price: salePrice || price,
      img: currentImage,
      qty: 1,
      weight: product.weight || "",
      units: product.units || "",
    });
    goToDetails();
  };

  return (
    <Card
      style={{
        width: "100%",
        border: "1px solid #eee",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        textAlign: "center",
        borderRadius: "12px",
        background: "#fff",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onClick={goToDetails}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE SECTION */}
      <div
        className="product-img-container"
        style={{
          width: "100%",
          height: "360px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={product.name || product.title}
            className={idx === hoverImageIndex ? "main-img" : `hover-${idx}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: idx === hoverImageIndex ? 1 : 0,
              transition: "opacity 0.4s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* PRODUCT INFO */}
      <Card.Body>
        <Card.Title className="fw-semibold">{product.name || product.title}</Card.Title>

        <div className="mb-2">
          {hasDiscount ? (
            <>
              <span className="fw-bold text-success fs-4 me-2">₹{salePrice.toFixed(2)}</span>
              <span className="text-muted text-decoration-line-through fs-6 me-2">
                ₹{price.toFixed(2)}
              </span>
              {offerPercent !== null && !isNaN(offerPercent) && (
                <span className="badge bg-danger fs-6">{offerPercent}% OFF</span>
              )}
            </>
          ) : (
            <span className="fw-bold text-success fs-4">₹{price.toFixed(2)}</span>
          )}
        </div>

        <div className="mb-2">
          {[...Array(5)].map((_, i) => (
            <BsStarFill
              key={i}
              color={i < rating ? "#ffc107" : "#e4e5e9"}
              size={18}
              className="me-1"
            />
          ))}
        </div>

        <Button variant="success" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

