import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Edit2, Trash2 } from "react-feather";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  const entriesPerPage = 8;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`, {
        params: { search, status, page, limit: entriesPerPage },
      });

      setProducts(Array.isArray(res.data.products) ? res.data.products : []);
      setTotalEntries(res.data.total || 0);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
      setTotalEntries(0);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, status]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;

  return (
    <div
      className="w-100 py-4"
      style={{
        minHeight: "100vh",
        padding: "0 35px",
        background:
          "linear-gradient(to bottom, #fff7d1 0%, #ffe9a1 40%, #ffd873 100%)",
      }}
    >
      {/* PAGE HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Products</h2>

        <Link
          to="/admin/add-product"
          className="btn btn-warning rounded-pill px-4 fw-semibold"
        >
          + Add Product
        </Link>
      </div>

      {/* FILTER BAR */}
      <div
        className="card border-0 rounded-4 mb-4"
        style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div className="card-body d-flex flex-wrap gap-3 align-items-center">
          <input
            type="text"
            className="form-control rounded-pill px-4 py-2"
            placeholder="Search products..."
            style={{ maxWidth: "300px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select rounded-pill px-3"
            style={{ width: "160px" }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>

          <button
            className="btn btn-dark rounded-pill px-4 fw-semibold"
            onClick={fetchProducts}
          >
            Apply
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="card border-0 mx-auto"
        style={{
          width: "100%",
          borderRadius: "22px",
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>HSN</th>
                  <th>Price</th>
                  <th>Sale</th>
                  <th>Offer</th>
                  <th>Tax 5%</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
  {products.length > 0 ? (
    products.map((p) => {
      const firstImage =
        p.image1 ||
        p.image2 ||
        p.image3 ||
        p.image4 ||
        p.image5 ||
        p.image6;

      // Read first variant (or empty if none)
      const v = p.variants?.[0] || {};

      return (
        <tr key={p.id}>
          
          {/* IMAGE */}
          <td>
            {firstImage ? (
              <img
                src={`${API_URL}/uploads/${firstImage}`}
                width="45"
                height="45"
                className="rounded"
                style={{ objectFit: "cover" }}
              />
            ) : (
              "-"
            )}
          </td>

          {/* NAME */}
          <td className="fw-semibold">{p.title}</td>

          {/* CATEGORY */}
          <td>{p.category}</td>

          {/* HSN */}
          <td>{p.hsn || "-"}</td>

          {/* PRICE */}
          <td>₹{v.price ?? 0}</td>

          {/* SALE PRICE */}
          <td className="text-success fw-semibold">
            ₹{v.sale_price ?? 0}
          </td>

          {/* OFFER PERCENT */}
          <td>{v.offer_percent ?? 0}%</td>

          {/* TAX (from tax_amount) */}
          <td className="text-danger">₹{v.tax_amount ?? 0}</td>

          {/* STOCK */}
          <td>{v.stock ?? 0}</td>

          {/* STATUS */}
          <td>
            <span
              className={`badge rounded-pill ${
                p.status === "Active" ? "bg-success" : "bg-secondary"
              }`}
            >
              {p.status}
            </span>
          </td>

          {/* DATE */}
          <td>{new Date(p.created_at).toLocaleDateString()}</td>

          {/* ACTIONS */}
          <td className="text-end">
            <button
              className="btn btn-outline-dark btn-sm rounded-circle me-2"
              onClick={() => navigate(`/admin/edit-product/${p.id}`)}
            >
              <Edit2 size={16} />
            </button>

            <button
              className="btn btn-outline-danger btn-sm rounded-circle"
              onClick={() => handleDelete(p.id)}
            >
              <Trash2 size={16} />
            </button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="12" className="text-center py-4">
        No products found.
      </td>
    </tr>
  )}
</tbody>

            </table>
          </div>

          {/* PAGINATION */}
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <span className="fw-semibold">
              Showing {products.length} of {totalEntries} entries
            </span>

            <div>
              <button
                className="btn btn-outline-secondary rounded-pill me-2 px-4"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>

              <button className="btn btn-dark rounded-pill px-4">{page}</button>

              <button
                className="btn btn-outline-secondary rounded-pill ms-2 px-4"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
