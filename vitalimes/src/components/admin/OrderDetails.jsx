// src/pages/OrderDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

export default function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const today = new Date();

  // Get HSN from first product


  // ===== Monthly Excel state =====
  const [exportYear, setExportYear] = useState(today.getFullYear());
  const [exportMonth, setExportMonth] = useState(
    String(today.getMonth() + 1).padStart(2, "0")
  );

  // ===== Range Excel state =====
  const [fromMonth, setFromMonth] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`
  );
  const [toMonth, setToMonth] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`
  );

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const basePublicUrl =
    typeof process !== "undefined" && process.env?.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : "";

  const logoSrc = basePublicUrl + "/assets/images/vita_logo.svg";
  const signSrc = basePublicUrl + "/assets/images/vita_signature.png";

  /* ---------------- LOAD ORDERS ---------------- */
  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/orders/all`);
      if (res.data.success) {
        setOrders(res.data.orders);
        setFiltered(res.data.orders);
      } else {
        setError("No orders found");
      }
    } catch (err) {
      console.error("ORDER LOAD ERROR:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const handleSearch = (e) => {
    const v = e.target.value.toLowerCase();
    setSearch(v);

    setFiltered(
      orders.filter(
        (o) =>
          (o.order_no || "").toLowerCase().includes(v) ||
          (o.name || "").toLowerCase().includes(v) ||
          (o.city || "").toLowerCase().includes(v) ||
          (o.mobile || "").toLowerCase().includes(v)
      )
    );
  };

  /* ---------------- HELPERS ---------------- */
  const formatMoney = (amt) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(Number(amt || 0));

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    if (isNaN(date.getTime())) return d;
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const numberToWords = (num) => {
    num = Math.round(Number(num || 0));
    if (num === 0) return "Zero only";

    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const belowThousand = (n) => {
      let str = "";
      if (n > 99) {
        str += ones[Math.floor(n / 100)] + " Hundred ";
        n = n % 100;
      }
      if (n > 19) {
        str += tens[Math.floor(n / 10)] + " ";
        n = n % 10;
      }
      if (n > 0) str += ones[n] + " ";
      return str.trim();
    };

    let result = "";
    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num / 100000) % 100);
    const thousand = Math.floor((num / 1000) % 100);
    const hundred = num % 1000;

    if (crore) result += belowThousand(crore) + " Crore ";
    if (lakh) result += belowThousand(lakh) + " Lakh ";
    if (thousand) result += belowThousand(thousand) + " Thousand ";
    if (hundred) result += belowThousand(hundred);

    return result.trim() + " only";
  };

  /* ---------------- PDF DOWNLOAD ---------------- */
  const handleDownloadPdf = (order_no) => {
    const element = document.getElementById(`invoice-${order_no}`);
    if (!element) return;

    const opt = {
      margin: [5, 5, 5, 5],
      filename: `invoice-${order_no}.pdf`,
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: ["css", "legacy"] },
    };

    html2pdf().set(opt).from(element).save();
  };

  /* ---------------- SINGLE MONTH EXCEL ---------------- */
  const handleDownloadMonthlyExcel = () => {
    const url = `${API}/api/orders/export-excel?year=${exportYear}&month=${exportMonth}`;
    window.open(url, "_blank");
  };

  /* ---------------- RANGE EXCEL ---------------- */
  const handleDownloadRangeExcel = () => {
    if (!fromMonth || !toMonth) return;
    const url = `${API}/api/orders/export-excel-range?from=${fromMonth}&to=${toMonth}`;
    window.open(url, "_blank");
  };

  return (
    <main className="main-content-wrapper">
      <div className="container py-4">
        <div className="d-flex justify-content-between mb-4 align-items-center">
          <h2 className="fw-bold">Order Invoices</h2>

          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control"
              style={{ width: "230px" }}
              placeholder="Search Order No / Name / City / Mobile..."
              value={search}
              onChange={handleSearch}
            />

            {/* Single Month Excel */}
            <input
              type="number"
              className="form-control"
              style={{ width: "80px" }}
              value={exportYear}
              min="2020"
              max="2100"
              onChange={(e) => setExportYear(e.target.value)}
            />
            <select
              className="form-select"
              style={{ width: "95px" }}
              value={exportMonth}
              onChange={(e) => setExportMonth(e.target.value)}
            >
              <option value="01">Jan</option>
              <option value="02">Feb</option>
              <option value="03">Mar</option>
              <option value="04">Apr</option>
              <option value="05">May</option>
              <option value="06">Jun</option>
              <option value="07">Jul</option>
              <option value="08">Aug</option>
              <option value="09">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <button
              className="btn btn-sm btn-success fw-semibold"
              onClick={handleDownloadMonthlyExcel}
            >
              Monthly Excel
            </button>

            {/* Range Excel */}
            <input
              type="month"
              className="form-control"
              style={{ width: "140px" }}
              value={fromMonth}
              onChange={(e) => setFromMonth(e.target.value)}
            />
            <input
              type="month"
              className="form-control"
              style={{ width: "140px" }}
              value={toMonth}
              onChange={(e) => setToMonth(e.target.value)}
            />
            <button
              className="btn btn-sm btn-info fw-semibold"
              onClick={handleDownloadRangeExcel}
            >
              Download Range Excel
            </button>
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {filtered.map((order, idx) => (
          <OrderInvoice
            key={order.id}
            serial={idx + 1}
            order={order}
            formatMoney={formatMoney}
            formatDate={formatDate}
            numberToWords={numberToWords}
            logoSrc={logoSrc}
            signSrc={signSrc}
            onDownload={handleDownloadPdf}
          />
        ))}
      </div>
    </main>
  );
}

/* =====================================================
   SINGLE ORDER INVOICE
===================================================== */
function OrderInvoice({ serial, order, formatMoney, formatDate, numberToWords, logoSrc, signSrc, onDownload }) {
  const GST_RATE = 5;
  let items = [];
  let hsn = "";

  try {
    const raw = JSON.parse(order.products_json || "[]");

    if (raw.length > 0 && raw[0].hsn) {
      hsn = raw[0].hsn; // ✅ get HSN here
    }

    items = raw.map((p, idx) => {
      const qty = Number(p.qty || 1);
      const grossUnit = Number(p.sale_price || p.price || 0);

      const netUnit = +(grossUnit * (100 / (100 + GST_RATE))).toFixed(2);
      const taxUnit = +(grossUnit - netUnit).toFixed(2);
      const netAmount = +(netUnit * qty).toFixed(2);
      const taxAmount = +(taxUnit * qty).toFixed(2);
      const totalAmount = +(grossUnit * qty).toFixed(2);

      const parts = [];
      if (p.title) parts.push(p.title);
      if (p.weight) parts.push(p.weight);
      if (p.hsn) parts.push(`HSN:${p.hsn}`);

      return {
        sl: idx + 1,
        description: parts.join(" | "),
        qty,
        unitPrice: grossUnit,
        netAmount,
        taxRate: GST_RATE,
        taxType: "IGST",
        taxAmount,
        totalAmount,
      };
    });
  } catch (e) {
    console.error("PRODUCTS_JSON PARSE ERROR:", e);
  }

  

  if (!items.length) {
    const gross = Number(order.total_amount || 0);
    const net = +(gross * (100 / 105)).toFixed(2);
    const tax = +(gross - net).toFixed(2);
    items = [
      {
        sl: 1,
        description: "Items",
        qty: order.quantity || 1,
        unitPrice: gross,
        netAmount: net,
        taxRate: GST_RATE,
        taxType: "IGST",
        taxAmount: tax,
        totalAmount: gross,
      },
    ];
  }

  const totalTax = items.reduce((s, it) => s + it.taxAmount, 0);
  const grandTotal = items.reduce((s, it) => s + it.totalAmount, 0);
  const amountInWords = numberToWords(grandTotal);
  const invoiceNo =
    order.invoice_no && order.invoice_no.trim() !== ""
      ? order.invoice_no
      : "Not assigned";

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <div
        id={`invoice-${order.order_no}`}
        style={{
          width: "100%",
          maxWidth: "700px",
          margin: "0 auto",
          background: "#ffffff",
          fontFamily: "Arial, sans-serif",
          fontSize: "11px",
          color: "#000",
          padding: "10px 15px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      >
        {/* TOP HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "10px",
          }}
        >
          <div>
            <img src={logoSrc} alt="Vitalimes" style={{ height: "80px" }} />
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: "bold", fontSize: "14px" }}>
              Tax Invoice/Bill of Supply/Cash Memo
            </div>
            <div style={{ fontSize: "10px" }}>(For Supplier)</div>
            <div style={{ marginTop: "4px", fontSize: "10px" }}>
              Sl. No: {serial}
            </div>
          </div>
        </div>

        {/* SOLD BY + BILLING ADDRESS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div style={{ width: "55%" }}>
            <div style={{ fontWeight: "bold", marginBottom: "3px" }}>Sold By :</div>
            <div>
              VITALIME AGRO TECH PRIVATE LIMITED
              <br />
              * 5/109, Meenakshi Nagar, Alampatti
              <br />
              Thoothukudi, TAMIL NADU, 628503
              <br />
              INDIA
            </div>

            <div style={{ marginTop: "10px" }}>
              {hsn && (
            <div>
            <span style={{ fontWeight: "bold" }}>HSN Code:</span> {hsn}
          </div>
            )}
 

              
              <div>
                <span style={{ fontWeight: "bold" }}>PAN No:</span> AAJCV8259L
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>GST Registration No:</span>{" "}
                33AAJCV8259L1ZN
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <div style={{ fontWeight: "bold" }}>FSSAI License No.</div>
              <div>12422029000832</div>
            </div>
          </div>

          <div style={{ width: "40%", textAlign: "right" }}>
            <div style={{ fontWeight: "bold", marginBottom: "3px" }}>Billing Address :</div>
            <div>
              {order.name}
              <br />
              {order.address}
              <br />
              {order.city}, {order.state}, {order.pin}
              <br />
              {order.country}
              <br />
              <span style={{ fontWeight: "bold" }}>Mobile:</span> {order.mobile}
            </div>
          </div>
        </div>

        {/* ORDER / INVOICE DETAIL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
            marginBottom: "5px",
            fontSize: "11px",
          }}
        >
          <div>
            <div>
              <span style={{ fontWeight: "bold" }}>Order Number:</span> {order.order_no}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Order Date:</span>{" "}
              {formatDate(order.order_date)}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div>
              <span style={{ fontWeight: "bold" }}>Invoice Number:</span> {invoiceNo}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Invoice Date:</span>{" "}
              {formatDate(order.order_date)}
            </div>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <table
          style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
          border="1"
          cellPadding="4"
        >
          <thead>
            <tr style={{ background: "#f2f2f2", fontWeight: "bold" }}>
              <th style={{ width: "5%", textAlign: "center" }}>Sl. No</th>
              <th style={{ width: "35%" }}>Description</th>
              <th style={{ width: "10%", textAlign: "right" }}>Unit Price</th>
              <th style={{ width: "7%", textAlign: "center" }}>Qty</th>
              <th style={{ width: "10%", textAlign: "right" }}>Net Amount</th>
              <th style={{ width: "8%", textAlign: "center" }}>Tax Rate</th>
              <th style={{ width: "8%", textAlign: "center" }}>Tax Type</th>
              <th style={{ width: "10%", textAlign: "right" }}>Tax Amount</th>
              <th style={{ width: "10%", textAlign: "right" }}>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.sl}>
                <td style={{ textAlign: "center" }}>{it.sl}</td>
                <td>{it.description}</td>
                <td style={{ textAlign: "right" }}>{formatMoney(it.unitPrice)}</td>
                <td style={{ textAlign: "center" }}>{it.qty}</td>
                <td style={{ textAlign: "right" }}>{formatMoney(it.netAmount)}</td>
                <td style={{ textAlign: "center" }}>{it.taxRate}%</td>
                <td style={{ textAlign: "center" }}>{it.taxType}</td>
                <td style={{ textAlign: "right" }}>{formatMoney(it.taxAmount)}</td>
                <td style={{ textAlign: "right" }}>{formatMoney(it.totalAmount)}</td>
              </tr>
            ))}
            <tr style={{ fontWeight: "bold" }}>
              <td colSpan={7} style={{ textAlign: "right" }}>
                TOTAL:
              </td>
              <td style={{ textAlign: "right" }}>{formatMoney(totalTax)}</td>
              <td style={{ textAlign: "right" }}>{formatMoney(grandTotal)}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: "10px", borderTop: "1px solid #000" }}>
          <div style={{ marginTop: "8px" }}>
            <span style={{ fontWeight: "bold" }}>Amount in Words:</span>
            <br />
            {amountInWords}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
              alignItems: "flex-end",
            }}
          >
            <div>
              <span style={{ fontWeight: "bold" }}>
                Whether tax is payable under reverse charge -
              </span>{" "}
              No
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "bold" }}>
                For VITALIME AGRO TECH PRIVATE LIMITED:
              </div>
              {signSrc && (
                <div style={{ marginTop: "6px", marginBottom: "2px" }}>
                  <img src={signSrc} alt="Authorized Signatory" style={{ height: "35px" }} />
                </div>
              )}
              <div style={{ marginTop: "2px", paddingTop: "4px", fontStyle: "italic", fontWeight: "bold" }}>
                Authorized Signatory
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "15px", textAlign: "center", fontSize: "9px", color: "#555" }}>
          Invoice generated by AppConnect Solutions
        </div>
      </div>

      {/* ACTION BUTTONS OUTSIDE PDF AREA */}
      <div className="mt-3 d-flex justify-content-end">
        <button className="btn btn-primary btn-sm" onClick={() => onDownload(order.order_no)}>
          Download PDF
        </button>
      </div>
    </div>
  );
}
