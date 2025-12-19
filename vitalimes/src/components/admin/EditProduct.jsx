import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Product main info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [hsn, setHsn] = useState("");
  const [status, setStatus] = useState("Active");
  const [categories, setCategories] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  // Images
  const [previews, setPreviews] = useState([null, null, null, null, null, null]);
  const [images, setImages] = useState([null, null, null, null, null, null]);

  // Video
  const [videoPreview, setVideoPreview] = useState(null);
  const [video, setVideo] = useState(null);

  const [loading, setLoading] = useState(true);

  // -----------------------------
  // VARIANTS ARRAY
  // -----------------------------
  const [variants, setVariants] = useState([]);

  // Auto calculations
  const calculateOfferPercent = (p, sp) => {
    if (!p || !sp) return 0;
    return (((p - sp) / p) * 100).toFixed(2);
  };

  const calculateSalePriceFromOffer = (p, offer) => {
    return (p * (1 - offer / 100)).toFixed(2);
  };

  // -----------------------------
  // LOAD PRODUCT
  // -----------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get(`${API_URL}/api/products/${id}`),
          axios.get(`${API_URL}/api/categories`)
        ]);

        const product = prodRes.data.product;
        setCategories(catRes.data);

        // MAIN PRODUCT FIELDS
        setTitle(product.title);
        setDescription(product.description || "");
        setCategory(product.category);
        setHsn(product.hsn);
        setStatus(product.status);

        // LOAD VARIANTS
        if (Array.isArray(product.variants)) {
          setVariants(product.variants);
        }

        // IMAGES
        const previewArr = [];
        for (let i = 1; i <= 6; i++) {
          const field = product[`image${i}`];
          previewArr.push(field ? `${API_URL}/uploads/${field}` : null);
        }
        setPreviews(previewArr);

        // VIDEO
        if (product.video) {
          setVideoPreview(`${API_URL}/uploads/${product.video}`);
        }

        setLoading(false);
      } catch (err) {
        alert("Failed to load product");
        navigate("/products");
      }
    };

    load();
  }, []);

  // -----------------------------
  // IMAGE HANDLERS
  // -----------------------------
  const handleImageChange = (index, file) => {
    const newImages = [...images];
    const newPreviews = [...previews];

    newImages[index] = file;
    newPreviews[index] = file ? URL.createObjectURL(file) : previews[index];

    setImages(newImages);
    setPreviews(newPreviews);
  };
 const handleRemoveImage = (index) => {
  const newImages = [...images];
  const newPreviews = [...previews];

  newImages[index] = null;
  newPreviews[index] = null;

  setImages(newImages);
  setPreviews(newPreviews);

  // Mark this image for removal (use backend field name)
  setRemovedImages((prev) => [...prev, `image${index + 1}`]);
};



  // -----------------------------
  // VIDEO
  // -----------------------------
  const handleVideoChange = (file) => {
    setVideo(file);
    if (file) setVideoPreview(URL.createObjectURL(file));
  };

  // -----------------------------
  // VARIANT HANDLERS
  // -----------------------------
  const updateVariant = (i, field, value) => {
    const v = [...variants];
    v[i][field] = value;

    // Auto calculations
    if (field === "price" || field === "sale_price") {
      v[i].offer_percent = calculateOfferPercent(v[i].price, v[i].sale_price);
      v[i].tax_amount = (v[i].sale_price * 0.05).toFixed(2);
      v[i].tax_percent = 5;
    }

    if (field === "offer_percent") {
      v[i].sale_price = calculateSalePriceFromOffer(v[i].price, value);
      v[i].tax_amount = (v[i].sale_price * 0.05).toFixed(2);
      v[i].tax_percent = 5;
    }

    setVariants(v);
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
      }
    ]);
  };

  const deleteVariant = (index) => {
    const v = [...variants];
    v.splice(index, 1);
    setVariants(v);
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("category", category);
    fd.append("hsn", hsn);
    fd.append("status", status);

    // Send variants array as JSON
    fd.append("variants", JSON.stringify(variants));

    // Images
    images.forEach((img, idx) => {
      if (img) fd.append(`image${idx + 1}`, img);
    });

    if (video) fd.append("video", video);
    removedImages.forEach((imgField) => {
    fd.append("removedImages[]", imgField);
  });

    try {
      await axios.put(`${API_URL}/api/products/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  // -----------------------------
  // RENDER UI
  // -----------------------------
  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="card p-4">

        {/* Title */}
        <label className="form-label">Product Title</label>
        <input className="form-control mb-3"
          value={title} onChange={(e) => setTitle(e.target.value)} required />

        {/* Description */}
        <label className="form-label">Description</label>
        <textarea className="form-control mb-3"
          rows={3} value={description}
          onChange={(e) => setDescription(e.target.value)} />

        {/* Category */}
        <label className="form-label">Category</label>
        <select className="form-select mb-3"
          value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.category_name}>
              {c.category_name}
            </option>
          ))}
        </select>

        {/* HSN */}
        <label className="form-label">HSN Code</label>
        <input className="form-control mb-3"
          value={hsn} onChange={(e) => setHsn(e.target.value)} />

        {/* ================================
            VARIANTS SECTION
        ================================== */}
        <h4 className="mt-4">Product Variants</h4>
        <button type="button" className="btn btn-success mb-2"
          onClick={addVariant}>+ Add Variant</button>

        {variants.map((v, i) => (
          <div className="border rounded p-3 mb-3" key={i}>

            <div className="row g-3">

              <div className="col-md-3">
                <label>Weight</label>
                <input className="form-control"
                  value={v.weight}
                  onChange={(e) => updateVariant(i, "weight", e.target.value)} />
              </div>

              <div className="col-md-2">
                <label>Price (MRP)</label>
                <input className="form-control" type="number"
                  value={v.price}
                  onChange={(e) => updateVariant(i, "price", e.target.value)} />
              </div>

              <div className="col-md-2">
                <label>Sale Price</label>
                <input className="form-control" type="number"
                  value={v.sale_price}
                  onChange={(e) => updateVariant(i, "sale_price", e.target.value)} />
              </div>

              <div className="col-md-2">
                <label>Offer (%)</label>
                <input className="form-control" type="number"
                  value={v.offer_percent}
                  onChange={(e) => updateVariant(i, "offer_percent", e.target.value)} />
              </div>

              <div className="col-md-2">
                <label>Stock</label>
                <input className="form-control" type="number"
                  value={v.stock}
                  onChange={(e) => updateVariant(i, "stock", e.target.value)} />
              </div>

              <div className="col-md-1 d-flex align-items-end">
                <button type="button" className="btn btn-danger"
                  onClick={() => deleteVariant(i)}>X</button>
              </div>

            </div>

            <div className="mt-2">
              <small className="text-muted">
                Tax (5%): ₹{v.tax_amount}
              </small>
            </div>

          </div>
        ))}

        {/* Images */}
        <h5 className="mt-4">Product Images</h5>
<div className="row g-3">
  {[0, 1, 2, 3, 4, 5].map((i) => (
    <div className="col-md-4" key={i}>
      <label>Image {i + 1}</label>

      <input
        type="file"
        className="form-control"
        accept="image/*"
        onChange={(e) => handleImageChange(i, e.target.files[0])}
      />

      {previews[i] && (
        <div className="mt-2">
          <img
            src={previews[i]}
            width="150"
            className="rounded border"
            alt={`Preview ${i + 1}`}
          />

          {/* Remove Image Button */}
          <button
            className="btn btn-danger btn-sm d-block mt-2"
            type="button"
            onClick={() => handleRemoveImage(i)}
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  ))}
</div>


        {/* Video */}
        <h5 className="mt-4">Product Video (Optional)</h5>
        <input type="file" className="form-control"
          accept="video/*"
          onChange={(e) => handleVideoChange(e.target.files[0])} />
        {videoPreview && (
          <video src={videoPreview} width="200" controls className="mt-2"></video>
        )}

        <button className="btn btn-primary mt-4">Save Changes</button>

      </form>
    </div>
  );
}
