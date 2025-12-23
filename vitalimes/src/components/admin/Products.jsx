import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit2, Trash2 } from "react-feather";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function Products() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const entriesPerPage = 8;

  // ---------------- LOAD PRODUCTS ----------------
  const loadProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      const list = Array.isArray(res.data.products)
        ? res.data.products
        : res.data || [];
      setAllProducts(list);
    } catch (err) {
      console.error("Failed to load products:", err);
      setAllProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ---------------- FILTER + PAGINATION ----------------
  useEffect(() => {
    let filtered = [...allProducts];

    if (search.trim() !== "") {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(term) ||
          (p.category || "").toLowerCase().includes(term)
      );
    }

    if (status) {
      filtered = filtered.filter((p) => p.status === status);
    }

    const start = (page - 1) * entriesPerPage;
    const end = start + entriesPerPage;

    setProducts(filtered.slice(start, end));
  }, [allProducts, search, status, page]);

  const totalEntries = allProducts.filter((p) => {
    let ok = true;
    if (search.trim() !== "") {
      const term = search.toLowerCase();
      ok =
        (p.title || "").toLowerCase().includes(term) ||
        (p.category || "").toLowerCase().includes(term);
    }
    if (status) ok = ok && p.status === status;
    return ok;
  }).length;

  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      loadProducts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="w-100 py-4" style={{ minHeight: "100vh", padding: "0 35px" }}>
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
      <div className="card border-0 rounded-4 mb-4" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(10px)", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div className="card-body d-flex flex-wrap gap-3 align-items-center">
          <input
            type="text"
            className="form-control rounded-pill px-4 py-2"
            placeholder="Search products..."
            style={{ maxWidth: "300px" }}
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />

          <select
            className="form-select rounded-pill px-3"
            style={{ width: "160px" }}
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="card border-0 mx-auto" style={{ width: "100%", borderRadius: "22px", background: "rgba(255, 255, 255, 0.55)", backdropFilter: "blur(10px)", boxShadow: "0 8px 25px rgba(0,0,0,0.08)", overflow: "hidden" }}>
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
                    const firstImage = p.image1 || p.image2 || p.image3 || "";
                    const v = p.variants?.[0] || {};

                    return (
                      <tr key={p.id}>
                        <td>
                          {firstImage ? (
                            <img src={`${API_URL}/uploads/${firstImage}`} width="45" height="45" className="rounded" style={{ objectFit: "cover" }} />
                          ) : "-"}
                        </td>
                        <td className="fw-semibold">{p.title}</td>
                        <td>{p.category}</td>
                        <td>{p.hsn || "-"}</td>
                        <td>₹{v.price ?? 0}</td>
                        <td className="text-success fw-semibold">₹{v.sale_price ?? 0}</td>
                        <td>{v.offer_percent ?? 0}%</td>
                        <td className="text-danger">₹{v.tax_amount ?? 0}</td>
                        <td>{v.stock ?? 0}</td>
                        <td>
                          <span className={`badge rounded-pill ${p.status === "Active" ? "bg-success" : "bg-secondary"}`}>{p.status}</span>
                        </td>
                        <td>{new Date(p.created_at).toLocaleDateString()}</td>
                        <td className="text-end">
                          <button className="btn btn-outline-dark btn-sm rounded-circle me-2" onClick={() => navigate(`/admin/edit-product/${p.id}`)}>
                            <Edit2 size={16} />
                          </button>
                          <button className="btn btn-outline-danger btn-sm rounded-circle" onClick={() => handleDelete(p.id)}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center py-4">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <span className="fw-semibold">Showing {products.length} of {totalEntries} entries</span>
            <div>
              <button className="btn btn-outline-secondary rounded-pill me-2 px-4" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
              <button className="btn btn-dark rounded-pill px-4">{page}</button>
              <button className="btn btn-outline-secondary rounded-pill ms-2 px-4" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
