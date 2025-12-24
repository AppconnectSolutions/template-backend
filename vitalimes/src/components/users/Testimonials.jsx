import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FeedbackCarousel() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [index, setIndex] = useState(0);
  const itemsPerSlide = 2; // 2 per row

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`);
        const data = await res.json();
        if (data.success) setFeedbacks(data.feedbacks);
      } catch (err) {
        console.error("Failed to fetch feedbacks:", err);
      }
    };
    fetchFeedbacks();
  }, []);

  const next = () => {
    setIndex((prev) =>
      prev + itemsPerSlide >= feedbacks.length ? 0 : prev + itemsPerSlide
    );
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? feedbacks.length - itemsPerSlide : prev - itemsPerSlide
    );
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [feedbacks]);

  const visibleItems = feedbacks.slice(index, index + itemsPerSlide);

  return (
    <section className="py-5" style={{ backgroundColor: "#faf7f2" }}>
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-semibold mb-0">From Our Customers</h2>
          <div className="d-flex gap-2">
            <button
              onClick={prev}
              className="btn btn-outline-secondary rounded-circle"
              style={{ width: 40, height: 40 }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="btn btn-outline-secondary rounded-circle"
              style={{ width: 40, height: 40 }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="row g-4">
          {visibleItems.map((item, i) => (
            <div className="col-12 col-lg-6" key={i}>
              <div className="row g-4 h-100 align-items-center">
                {/* Product Image */}
                <div className="col-12 col-md-6">
                  <div className="bg-white rounded-4 shadow-sm h-100 d-flex align-items-center justify-content-center p-4">
                   <img
  src={item.product_image || "/placeholder.png"} // Use backend URL or fallback
  alt={item.product_name} // Updated to match backend field
  className="img-fluid"
  style={{ maxHeight: 260, objectFit: "contain" }}
/>

                  </div>
                </div>

                {/* Feedback Card */}
                <div className="col-12 col-md-6">
                  <div className="bg-white rounded-4 shadow-sm h-100 p-4 d-flex flex-column justify-content-center">
                    <Quote size={22} className="text-secondary mb-2" />
                    <h5 className="fw-semibold">{item.productName}</h5>
                    <p className="text-muted mb-2">{item.message}</p>
                    <p className="fw-semibold mb-0">— {item.name}</p>
                    <p className="mb-0">
                      Rating: {"⭐".repeat(item.rating)}{" "}
                      {"☆".repeat(5 - item.rating)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
