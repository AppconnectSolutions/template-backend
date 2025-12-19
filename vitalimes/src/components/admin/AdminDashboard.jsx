import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, BarElement, Tooltip, Legend);

export default function Dashboard() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [revenue, setRevenue] = useState(0);
  const [ordersCount, setOrdersCount] = useState({ total: 0, pending: 0, delivered: 0 });
  const [productsCount, setProductsCount] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_URL}/api/dashboard`);
      const data = await res.json();

      if (data.success) {
        setRevenue(data.revenue || 0);
        setOrdersCount(data.ordersCount || { total: 0, pending: 0, delivered: 0 });
        setProductsCount(data.productsCount || 0);

        setMonthlyRevenue(data.monthlyRevenue || []);
        setMonthlyOrders(data.monthlyOrders || []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  // ===== Chart Data =====
  const lineData = {
    labels: monthlyRevenue.map((d) => d.month),
    datasets: [
      {
        label: "Revenue",
        data: monthlyRevenue.map((d) => d.revenue),
        fill: false,
        borderColor: "#16a34a",
        tension: 0.4,
        pointBackgroundColor: "#16a34a",
        pointRadius: 5,
      },
    ],
  };

  const barData = {
    labels: monthlyOrders.map((d) => d.month),
    datasets: [
      {
        label: "Orders",
        data: monthlyOrders.map((d) => d.orders),
        backgroundColor: "#16a34a",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: "#e5e7eb" }, ticks: { color: "#374151" } },
      x: { grid: { display: false }, ticks: { color: "#374151" } },
    },
  };

  return (
    <main className="main-content-wrapper p-4">
      <h2 className="fw-bold">Dashboard</h2>
      <p className="text-muted mb-4">Manage your products and track sales</p>

      {/* ===== CARDS ===== */}
      <div className="row g-4 mb-3">
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <p className="fw-semibold">Total Revenue</p>
            <h3 className="fw-bold">₹{revenue.toLocaleString()}.00</h3>
            <p className="text-success small">+12.5% from last month</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <p className="fw-semibold">Total Orders</p>
            <h3 className="fw-bold">{ordersCount.total}</h3>
            <p className="small">
              <span className="text-secondary">{ordersCount.pending} pending</span> |{" "}
              <span className="text-success">{ordersCount.delivered} delivered</span>
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <p className="fw-semibold">Total Products</p>
            <h3 className="fw-bold">{productsCount}</h3>
            <p className="text-secondary small">Active products</p>
          </div>
        </div>
      </div>

      {/* ===== CHARTS ===== */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h5 className="fw-semibold mb-3">📈 Sales Statistics</h5>
            <Line data={lineData} options={chartOptions} height={200} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h5 className="fw-semibold mb-3">📊 Monthly Orders</h5>
            <Bar data={barData} options={chartOptions} height={200} />
          </div>
        </div>
      </div>
    </main>
  );
}
