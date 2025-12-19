import React, { useState, useEffect } from "react";
import environment from "../../environment.js";  // ✅ correct



export default function Category() {
  const API_URL = environment.API_URL;

  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories for dropdown (optional)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("parentCategory", parentCategory);
    formData.append("date", date);
    formData.append("status", status);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Category created successfully!");
        // Reset form
        setCategoryName("");
        setParentCategory("");
        setDate("");
        setStatus("Active");
        setImage(null);
      } else {
        alert("Failed to add category.");
      }
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Failed to add category. Please try again.");
    }
  };

  return (
    <main className="main-content-wrapper">
      <div className="container">
        <div className="row mb-8">
          <div className="col-md-12">
            <div className="d-md-flex justify-content-between align-items-center">
              <div>
                <h2>Add New Category</h2>
              </div>
              <div>
                <a href="/admin/categories" className="btn btn-light">Back to Categories</a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="card mb-6 shadow border-0">
              <div className="card-body p-6">
                <h4 className="mb-5 h5">Category Image</h4>
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
                      <label className="form-label">Parent Category</label>
                      <select
                        className="form-select"
                        value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                      >
                        <option value="">Select Parent</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.category_name}>
                            {cat.category_name}
                          </option>
                        ))}
                      </select>
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
                      <button type="submit" className="btn btn-primary">Create Category</button>
                      <button type="reset" className="btn btn-secondary ms-2">Reset</button>
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
