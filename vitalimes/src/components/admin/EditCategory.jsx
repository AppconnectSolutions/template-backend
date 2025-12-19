// src/components/admin/EditCategory.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function EditCategory() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  // 🔹 Load existing category
  useEffect(() => {
    const loadCategory = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories/${id}`);
        const data = await res.json();

        setCategoryName(data.category_name || "");
        setDate(data.date ? data.date.substring(0, 10) : "");
        setStatus(data.status || "Active");
        setExistingImage(data.image_url || "");
      } catch (err) {
        console.error("Failed to load category:", err);
        alert("Failed to load category details");
      }
    };

    loadCategory();
  }, [API_URL, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("date", date);
    formData.append("status", status);
    if (image) {
      formData.append("image", image);  // only if new image selected
    }

    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Category updated successfully!");
        navigate("/categories");
      } else {
        alert("Failed to update category");
      }
    } catch (err) {
      console.error("Error updating category:", err);
      alert("Error updating category");
    }
  };

  return (
    <main className="main-content-wrapper">
      <div className="container">
        <div className="row mb-8">
          <div className="col-md-12">
            <div className="d-md-flex justify-content-between align-items-center">
              <div>
                <h2>Edit Category</h2>
              </div>
              <div>
                <Link to="/categories" className="btn btn-light">
                  Back to Categories
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="card mb-6 shadow border-0">
              <div className="card-body p-6">
                <h4 className="mb-5 h5">Category Image</h4>

                {existingImage && (
                  <div className="mb-3">
                    <p className="mb-1">Current image:</p>
                    <img
                      src={`${API_URL}/uploads/${existingImage}`}
                      alt="Category"
                      style={{ height: "80px", borderRadius: "8px" }}
                    />
                  </div>
                )}

                <div className="mb-4 d-flex">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <h4 className="mb-4 h5 mt-5">Category Information</h4>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Category Name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>

                    <div className="mb-3 col-lg-12">
                      <label className="form-label">Status</label>
                      <br />
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          value="Active"
                          checked={status === "Active"}
                          onChange={(e) => setStatus(e.target.value)}
                        />
                        <label className="form-check-label">Active</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          value="Disabled"
                          checked={status === "Disabled"}
                          onChange={(e) => setStatus(e.target.value)}
                        />
                        <label className="form-check-label">Disabled</label>
                      </div>
                    </div>

                    <div className="col-lg-12">
  <button type="submit" className="btn btn-primary">
    Update Category
  </button>
  <button
    type="button"
    className="btn btn-secondary ms-2"
    onClick={() => navigate("/categories")}
  >
    Cancel
  </button>
</div>

                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
