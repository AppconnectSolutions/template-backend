import React from "react";
import html2pdf from "html2pdf.js";

export default function InvoiceView({
  order,
  serial = 1,
  formatMoney,
  formatDate,
  numberToWords,
  logoSrc,
  signSrc,
}) {
  const GST_RATE = 5;
  let items = [];
  let hsn = "";

  /* ---------- PARSE PRODUCTS ---------- */
  try {
    const raw = JSON.parse(order.products_json || "[]");

    if (raw.length && raw[0].hsn) hsn = raw[0].hsn;

    items = raw.map((p, idx) => {
      const qty = Number(p.qty || 1);
      const gross = Number(p.sale_price || p.price || 0);

      const netUnit = +(gross * (100 / (100 + GST_RATE))).toFixed(2);
      const taxUnit = +(gross - netUnit).toFixed(2);

      return {
        sl: idx + 1,
        description: [
          p.title,
          p.weight,
          p.hsn && `HSN:${p.hsn}`,
        ]
          .filter(Boolean)
          .join(" | "),
        qty,
        unitPrice: gross,
        netAmount: +(netUnit * qty).toFixed(2),
        taxRate: GST_RATE,
        taxType: "IGST",
        taxAmount: +(taxUnit * qty).toFixed(2),
        totalAmount: +(gross * qty).toFixed(2),
      };
    });
  } catch (e) {
    console.error("Invoice parse error", e);
  }

  if (!items.length) return null;

  const totalTax = items.reduce((s, i) => s + i.taxAmount, 0);
  const grandTotal = items.reduce((s, i) => s + i.totalAmount, 0);

  const invoiceNo =
    order.invoice_no && order.invoice_no.trim()
      ? order.invoice_no
      : "Not assigned";

  /* ---------- DOWNLOAD PDF ---------- */
  const downloadPdf = () => {
    const el = document.getElementById(`invoice-${order.order_no}`);
    if (!el) return;

    html2pdf()
      .set({
        filename: `Invoice-${order.order_no}.pdf`,
        margin: 8,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(el)
      .save();
  };

  /* ---------- PRINT ---------- */
  const printInvoice = () => {
    const content = document.getElementById(`invoice-${order.order_no}`);
    const win = window.open("", "", "width=900,height=650");
    win.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial; font-size: 11px; }
            table { width:100%; border-collapse: collapse; }
            th, td { border:1px solid #000; padding:4px; }
          </style>
        </head>
        <body>${content.innerHTML}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <div>
      {/* ACTION BAR */}
      <div className="d-flex justify-content-end gap-2 mb-3">
        <button className="btn btn-sm btn-outline-primary" onClick={downloadPdf}>
          ⬇ Download PDF
        </button>
        <button className="btn btn-sm btn-outline-dark" onClick={printInvoice}>
          🖨 Print
        </button>
      </div>

      {/* INVOICE */}
      <div
        id={`invoice-${order.order_no}`}
        style={{
          background: "#fff",
          padding: "15px",
          border: "1px solid #ccc",
          fontSize: "11px",
        }}
      >
        {/* HEADER */}
        <div className="d-flex justify-content-between">
          <img src={logoSrc} height="70" alt="Logo" />
          <div className="text-end">
            <div className="fw-bold">
              Tax Invoice/Bill of Supply/Cash Memo
            </div>
            <div>(For Supplier)</div>
            <div>Sl. No: {serial}</div>
          </div>
        </div>

        {/* SOLD BY / BILLING */}
        <div className="d-flex justify-content-between mt-3">
          <div style={{ width: "55%" }}>
            <b>Sold By :</b>
            <br />
            VITALIME AGRO TECH PRIVATE LIMITED
            <br />
            * 5/109, Meenakshi Nagar, Alampatti
            <br />
            Thoothukudi, TAMIL NADU, 628503
            <br />
            INDIA
            <br />
            <b>PAN:</b> AAJCV8259L
            <br />
            <b>GST:</b> 33AAJCV8259L1ZN
            <br />
            <b>FSSAI:</b> 12422029000832
            <br />
            {order.waybill && (
              <>
                <b>Waybill:</b> {order.waybill}
              </>
            )}
          </div>

          <div style={{ width: "40%", textAlign: "right" }}>
            <b>Billing Address :</b>
            <br />
            {order.name}
            <br />
            {order.address}
            <br />
            {order.city}, {order.state} - {order.pin}
            <br />
            {order.country}
            <br />
            <b>Mobile:</b> {order.mobile}
          </div>
        </div>

        {/* ORDER DETAILS */}
        <div className="d-flex justify-content-between mt-3">
          <div>
            <b>Order Number:</b> {order.order_no}
            <br />
            <b>Order Date:</b> {formatDate(order.order_date)}
            <br />
            <b>Ship Date:</b>{" "}
            {order.ship_date
              ? formatDate(order.ship_date)
              : "Not shipped"}
          </div>
          <div className="text-end">
            <b>Invoice Number:</b> {invoiceNo}
            <br />
            <b>Invoice Date:</b> {formatDate(order.order_date)}
          </div>
        </div>

        {/* TABLE */}
        <table className="mt-3" width="100%">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Net</th>
              <th>Tax %</th>
              <th>Tax Type</th>
              <th>Tax</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={`${order.order_no}-${i.sl}`}>
                <td>{i.sl}</td>
                <td>{i.description}</td>
                <td>{formatMoney(i.unitPrice)}</td>
                <td>{i.qty}</td>
                <td>{formatMoney(i.netAmount)}</td>
                <td>{i.taxRate}%</td>
                <td>{i.taxType}</td>
                <td>{formatMoney(i.taxAmount)}</td>
                <td>{formatMoney(i.totalAmount)}</td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td colSpan="7" className="text-end">
                TOTAL
              </td>
              <td>{formatMoney(totalTax)}</td>
              <td>{formatMoney(grandTotal)}</td>
            </tr>
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="mt-3">
          <b>Amount in Words:</b>
          <br />
          {numberToWords(grandTotal)}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <div>
            <b>Whether tax is payable under reverse charge:</b> No
          </div>
          <div className="text-end">
            <b>For VITALIME AGRO TECH PRIVATE LIMITED</b>
            <br />
            {signSrc && (
              <img src={signSrc} height="35" alt="Sign" />
            )}
            <div className="fw-bold">Authorized Signatory</div>
          </div>
        </div>

        <div className="text-center mt-3 text-muted" style={{ fontSize: "9px" }}>
          Invoice generated by AppConnect Solutions
        </div>
      </div>
    </div>
  );
}
