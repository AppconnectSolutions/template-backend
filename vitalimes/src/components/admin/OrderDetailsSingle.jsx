import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";

export default function OrderDetailsSingle() {
  const { order_no } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load ONE shipment
  const loadShipment = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/shipments/order/${order_no}`
      );

      if (res.data.success) {
        setShipment(res.data.shipment);
      } else {
        alert("Shipment not found");
      }
    } catch (err) {
      console.error("Error loading shipment:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShipment();
  }, []);

  const exportSingleCSV = () => {
    if (!shipment) return;

    let csv =
      "Order No,Name,City,State,Pin,Phone,Amount,Waybill,Weight,Length,Breadth,Height,Shipping Mode,Fragile,Payment Mode,COD Amount\n";

    csv += `${shipment.order_no},${shipment.name},${shipment.city},${shipment.state},${shipment.pin},${shipment.mobile},${shipment.total_amount},${shipment.waybill},${shipment.weight},${shipment.shipment_length},${shipment.shipment_breadth},${shipment.shipment_height},${shipment.shipping_mode},${shipment.fragile_item},${shipment.payment_mode},${shipment.cod_amount}\n`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shipment-${shipment.order_no}.csv`;
    a.click();
  };

  const downloadPDF = () => {
    const element = document.getElementById("single-shipment-card");
    const opt = {
      margin: 0.5,
      filename: `shipment-${shipment.order_no}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
  };

  if (loading) return <p>Loading...</p>;
  if (!shipment) return <p>No shipment found</p>;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">Order Details</h2>
      <p className="text-muted mb-4">Showing shipment details for {shipment.order_no}</p>

      <div id="single-shipment-card" className="card p-4 shadow">

        <div className="d-flex justify-content-between">
          <div>
            <p className="text-muted mb-1">ORDER NO</p>
            <h4>{shipment.order_no}</h4>

            <p className="text-muted mt-3 mb-1">ORDER DATE</p>
            <p>{shipment.order_date}</p>

            <p className="text-muted mt-3 mb-1">WAYBILL</p>
            <p>{shipment.waybill || "Not Assigned"}</p>
          </div>

          <div className="text-end">
            <h4 className="text-success">₹{shipment.total_amount}</h4>

            <button
              className="btn btn-outline-success btn-sm mt-3"
              onClick={exportSingleCSV}
            >
              CSV
            </button>

            <button
              className="btn btn-outline-primary btn-sm mt-3 ms-2"
              onClick={downloadPDF}
            >
              PDF
            </button>
          </div>
        </div>

        <hr />

        <h5>Customer Details</h5>
        <p><strong>{shipment.name}</strong></p>
        <p>{shipment.address}</p>
        <p>{shipment.city}, {shipment.state}, {shipment.country} - {shipment.pin}</p>
        <p><b>Phone:</b> {shipment.mobile}</p>

        <hr />

        <h5>Shipment Details</h5>
        <p>Weight: {shipment.weight} gm</p>
        <p>Dimensions: {shipment.shipment_length} × {shipment.shipment_breadth} × {shipment.shipment_height} cm</p>
        <p>Shipping Mode: {shipment.shipping_mode === "S" ? "Surface" : "Express"}</p>
        <p>Fragile: {shipment.fragile_item === "true" ? "Yes" : "No"}</p>
        <p>Payment: {shipment.payment_mode}</p>
        {shipment.payment_mode === "COD" && <p>COD Amount: ₹{shipment.cod_amount}</p>}
      </div>
    </div>
  );
}
