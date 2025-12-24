import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

export default function FeedbackForm() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productId: "",
    category: "",
    rating: 0,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products?status=Active`);
        const data = await res.json();
        if (data.success) setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRating = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.productId || !formData.message || !formData.rating) {
      setStatus({ type: "error", msg: "Please fill all required fields & select a rating" });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: "", msg: "" });

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to send feedback");

      setStatus({ type: "success", msg: "Thank you for your feedback!" });
      setFormData({ name: "", email: "", productId: "", category: "", rating: 0, message: "" });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", msg: err.message || "Failed to send feedback" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg p-4 p-md-5 rounded border-0">
            <h2 className="text-center mb-4">Product Feedback</h2>
            <p className="text-center text-muted mb-4">
              Please select a product, give a rating, and share your feedback.
            </p>

            {status.msg && (
              <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"} text-center`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-lg rounded-pill"
                  placeholder="Your Name*"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg rounded-pill"
                  placeholder="Your Email*"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <select
                  className="form-select form-select-lg"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Product*</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <select
                  className="form-select form-select-lg"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Feedback Category</option>
                  <option value="quality">Quality</option>
                  <option value="delivery">Delivery</option>
                  <option value="service">Service</option>
                </select>
              </div>

             <div className="mb-3">
  <label className="form-label">Rating*</label>
  <div>
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button" // Important: prevents form submit/redirect
        onClick={() => handleRating(star)}
        style={{
          cursor: "pointer",
          color: star <= formData.rating ? "#ffc107" : "#e4e5e9",
          fontSize: "1.8rem",
          background: "none",
          border: "none",
          padding: 0,
          marginRight: "5px",
        }}
      >
        &#9733;
      </button>
    ))}
  </div>
</div>

              <div className="mb-3">
  <select
    className="form-select form-select-lg"
    name="message"
    value={formData.message}
    onChange={handleChange}
    required
  >
    <option value="">Select your feedback*</option>
    <option value="">Select your feedback*</option>
    <option value="Excellent">🌟 Excellent</option>
    <option value="Good">🙂 Good</option>
    <option value="Satisfactory">😐 Satisfactory</option>
    <option value="Needs Improvement">⚠️ Needs Improvement</option>
    <option value="Poor">😕 Poor</option>
    <option value="The product is excellent!">The product is excellent!</option>
    <option value="Product quality is good and delivery was fast.">Product quality is good and delivery was fast.</option>
    <option value="Product is good but delivery took a bit longer.">Product is good but delivery took a bit longer.</option>
    <option value="Service is very helpful, happy with the support.">Service is very helpful, happy with the support.</option>
    <option value="The product is okay, could improve packaging.">The product is okay, could improve packaging.</option>
    <option value="Delivery was slightly delayed but overall satisfied.">Delivery was slightly delayed but overall satisfied.</option>
  </select>
</div>


              

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg rounded-pill" disabled={loading}>
                  {loading ? "Sending..." : "Submit Feedback"}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4 text-center text-muted">
            <small>We appreciate every feedback & improve based on your suggestions!</small>
          </div>
        </div>
      </div>
    </div>
  );
}
