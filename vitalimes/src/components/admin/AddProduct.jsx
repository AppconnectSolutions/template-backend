import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddProducts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [hsn, setHsn] = useState("");
  const [status, setStatus] = useState("Active");
  const [units, setUnits] = useState("");

  const [images, setImages] = useState([null, null, null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null, null, null]);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [categories, setCategories] = useState([]);

  const [variants, setVariants] = useState([
    {
      weight: "",
      price: "",
      sale_price: "",
      offer: "",
      tax_percent: "5",
      tax_amount: "",
      stock: "",
    },
  ]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const weightOptions = ["5g", "1kg", "250g", "100g", "250g", "500g", "10ml", "15ml", "50ml", "500ml"];
  const taxOptions = ["5", "18"];

const updateVariantField = (i, field, value) => {
  const list = [...variants];

  // Convert numeric fields
  if (["price", "sale_price", "stock", "tax_percent"].includes(field)) {
    value = value === "" ? "" : Number(value);
  }

  list[i][field] = value;

  const p = Number(list[i].price);
  const s = Number(list[i].sale_price);
  const t = Number(list[i].tax_percent);

  // Offer %
  if (!isNaN(p) && !isNaN(s) && p > 0) {
    list[i].offer_percent = (((p - s) / p) * 100).toFixed(2);
  }

  // Tax amount
  if (!isNaN(s) && !isNaN(t)) {
    list[i].tax_amount = ((s * t) / 100).toFixed(2);
  }

  setVariants(list);
};


  const addVariant = () => {
    setVariants([
      ...variants,
      {
        weight: "",
        price: "",
        sale_price: "",
        offer_percent: "",
        tax_percent: "5",
        tax_amount: "",
        stock: "",
      },
    ]);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => setCategories(res.data || []))
      .catch(() => setCategories([]));
  }, []);

  const handleImageUpload = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);

    const updatedPreviews = [...previews];
    updatedPreviews[index] = file ? URL.createObjectURL(file) : null;
    setPreviews(updatedPreviews);
  };

  const handleVideoUpload = (file) => {
    setVideo(file);
    setVideoPreview(file ? URL.createObjectURL(file) : null);
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const v of variants) {
    if (v.price === "" || isNaN(Number(v.price))) {
      alert("Each variant must have a valid price");
      return;
    }
  }
    const fd = new FormData();

    fd.append("title", title);
    fd.append("description", description);
    fd.append("category", category);
    fd.append("hsn", hsn);
    fd.append("status", status);
    fd.append("units", units.trim() === "" ? null : units);

    fd.append("variants", JSON.stringify(variants));

    images.forEach((img, index) => {
      if (img) fd.append(`image${index + 1}`, img);
    });

    if (video) fd.append("video", video);

    try {
      await axios.post(`${API_URL}/api/products`, fd);
      alert("Product added successfully!");
      window.location.reload();
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="w-100 py-5" style={{ background: "#fff7d1" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        <div className="p-4 shadow rounded-4 bg-white">
          <h2 className="fw-bold mb-4">Add New Product</h2>

          <form onSubmit={handleSubmit}>
            <div className="row g-4">

              <div className="col-md-6">
                <label className="form-label">Title</label>
                <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div className="col-md-6">
                <label className="form-label">Description</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">Select</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.category_name}>{c.category_name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">HSN Code</label>
                <input className="form-control" value={hsn} onChange={(e) => setHsn(e.target.value)} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Units</label>
                <input className="form-control" placeholder="Example: 500ml, 1kg" value={units} onChange={(e) => setUnits(e.target.value)} />
              </div>

              <div className="col-12 mt-4">
                <h5 className="fw-bold">Additional Weight Variants</h5>

                {variants.map((v, i) => (
                  <div className="row g-3 p-3 mb-3 rounded border" key={i}>
                    
                    <div className="col-md-2">
                      <label className="form-label">Weight</label>
                      <select className="form-select" value={v.weight} onChange={(e) => updateVariantField(i, "weight", e.target.value)}>
                        <option value="">Select</option>
                        {weightOptions.map((w) => <option key={w}>{w}</option>)}
                      </select>
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">MRP</label>
                      <input className="form-control" value={v.price} onChange={(e) => updateVariantField(i, "price", e.target.value)} />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">Sale Price</label>
                      <input className="form-control" value={v.sale_price} onChange={(e) => updateVariantField(i, "sale_price", e.target.value)} />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">Offer (%)</label>
                      <input className="form-control" disabled value={v.offer_percent} />

                    </div>

                    <div className="col-md-2">
                      <label className="form-label">Tax %</label>
                      <select className="form-select" value={v.tax_percent} onChange={(e) => updateVariantField(i, "tax_percent", e.target.value)}>
                        {taxOptions.map((t) => (
                          <option key={t} value={t}>{t}%</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">Tax Amount</label>
                      <input className="form-control" disabled value={v.tax_amount} />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">Stock</label>
                      <input className="form-control" value={v.stock} onChange={(e) => updateVariantField(i, "stock", e.target.value)} />
                    </div>

                  </div>
                ))}

                <button type="button" className="btn btn-dark rounded-pill px-4" onClick={addVariant}>
                  + Add More Variant
                </button>
              </div>

              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div className="col-md-4" key={i}>
                  <label className="form-label">Image {i + 1}</label>
                  <input type="file" className="form-control" accept="image/*" onChange={(e) => handleImageUpload(i, e.target.files[0])} />
                  {previews[i] && <img src={previews[i]} width="120" className="mt-2 rounded" />}
                </div>
              ))}

              <div className="col-12">
                <label className="form-label">Product Video (Optional)</label>
                <input type="file" className="form-control" accept="video/*" onChange={(e) => handleVideoUpload(e.target.files[0])} />
                {videoPreview && (
                  <video width="200" controls className="mt-2 rounded">
                    <source src={videoPreview} />
                  </video>
                )}
              </div>

              <div className="col-12 mt-4">
                <button className="btn btn-warning w-100 rounded-pill py-2 fw-bold">
                  Create Product
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
