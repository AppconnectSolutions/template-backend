import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// PDF & OCR libraries
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export default function UpdateShipment() {
  // ⚠️ Use the param name that matches backend: order_no
  const { order_no } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    waybill: "",
    ship_date: "",
  });

  const [uploading, setUploading] = useState(false);

  // Convert PDF → Image
  const pdfToImage = async (file) => {
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 3 });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;

    return canvas.toDataURL("image/png");
  };

  // Extract Waybill from OCR
  const extractWaybillText = (text) => {
    return (
      text.match(/AWB[\s:-]*([0-9A-Za-z]+)/i)?.[1] ||
      text.match(/Waybill[\s:-]*([0-9A-Za-z]+)/i)?.[1] ||
      text.match(/LR[\s:-]*([0-9A-Za-z]+)/i)?.[1] ||
      text.match(/([0-9]{6,20})/)?.[1] ||
      ""
    );
  };

  // Extract Ship Date from OCR
  const extractShipDate = (text) => {
    const clean = text.replace(/\n+/g, " ");
    const match = clean.match(
      /D[a-z\s]*e[:\s]*([0-9]{1,2})\s+([A-Za-z]{3,9})\s+([0-9]{4})/i
    );

    if (match) return `${match[1]} ${match[2]} ${match[3]}`;
    return "";
  };

  // Handle PDF upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const imgSrc = await pdfToImage(file);
      const ocr = await Tesseract.recognize(imgSrc, "eng");
      const text = ocr.data.text;

      setForm({
        waybill: extractWaybillText(text),
        ship_date: extractShipDate(text),
      });

      alert("PDF processed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to extract shipment details.");
    }

    setUploading(false);
  };

  // Save shipment (only waybill & ship_date)
  const saveShipment = async () => {
    try {
      const res = await axios.put(
  `http://localhost:5000/api/shipments/update-shipment/${order_no}`,
  {
    waybill: form.waybill,
    ship_date: form.ship_date,
  }
);


      if (res.data.success) {
        alert("Shipment updated successfully!");
        navigate("/orders/details");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating shipment");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Update Shipment</h2>

      <div className="mb-4">
        <label className="fw-bold">Upload PDF (Auto Fill)</label>
        <input
          type="file"
          accept="application/pdf"
          className="form-control mt-2"
          onChange={handleFileUpload}
        />
        {uploading && <p className="text-info">Extracting… Please wait…</p>}
      </div>

      <div className="card p-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Waybill</label>
            <input
              className="form-control"
              value={form.waybill}
              onChange={(e) => setForm({ ...form, waybill: e.target.value })}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Ship Date</label>
            <input
              className="form-control"
              value={form.ship_date}
              onChange={(e) =>
                setForm({ ...form, ship_date: e.target.value })
              }
            />
          </div>
        </div>

        <button className="btn btn-success mt-4" onClick={saveShipment}>
          Save Shipment
        </button>
      </div>
    </div>
  );
}
