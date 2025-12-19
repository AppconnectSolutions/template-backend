import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Orders() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("vitalimes_user"));

  useEffect(() => {
    if (user) fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/orders/user/${user.id}`);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Order fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <h4 className="text-center text-danger mt-5">
        Please login to view your orders.
      </h4>
    );
  }

  if (loading) {
    return <h3 className="text-center mt-5">Loading orders...</h3>;
  }

  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="py-6 p-md-6 p-lg-10">
        <h2 className="mb-6">Your Orders</h2>

        {orders.length === 0 ? (
          <h5 className="text-muted">No orders found.</h5>
        ) : (
          <div className="table-responsive-xxl border-0">
            <table className="table mb-0 text-nowrap table-centered">
              <thead className="bg-light">
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) =>
                  order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="align-middle">
                        <img
                          src={`${API_URL}/uploads/${item.image}`}
                          alt="Product"
                          className="icon-shape icon-xl"
                          style={{ borderRadius: "8px" }}
                        />
                      </td>

                      <td className="align-middle">
                        <Link
                          to={`/product/${item.product_id}`}
                          className="fw-semibold text-inherit"
                        >
                          <h6 className="mb-0">{item.title}</h6>
                        </Link>
                        <small className="text-muted">{item.weight}</small>
                      </td>

                      <td className="align-middle">#{order.id}</td>

                      <td className="align-middle">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>

                      <td className="align-middle">{item.qty}</td>

                      <td className="align-middle">
                        <span
                          className={`badge ${
                            order.status === "Completed"
                              ? "bg-success"
                              : order.status === "Cancelled"
                              ? "bg-danger"
                              : "bg-warning"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="align-middle">
                        ₹{item.total_price.toFixed(2)}
                      </td>

                      <td className="align-middle text-muted">
                        <Link to={`/order/${order.id}`} className="text-inherit">
                          <i className="feather-icon icon-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
