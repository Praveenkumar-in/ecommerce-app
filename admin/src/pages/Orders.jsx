

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const adminToken = localStorage.getItem("adminToken");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        backendUrl + "/api/order/list",

      );
      if (res.data?.success) {
        setOrders(res.data.orders || []);
      } else {
        toast.error(res.data?.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error("Fetch Orders Error:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update order status
  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.post(
        `  ${backendUrl}/api/order/status`,
        { orderId, status }
      );

      if (res.data?.success) {
        toast.success("Order status updated");
        fetchOrders(); // refresh list
      } else {
        toast.error(res.data?.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Update Status Error:", err);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // useEffect(() => {
  //   if (adminToken) fetchOrders();
  // }, []);

  if (loading) {
    return <div className="p-4">Loading orders...</div>;
  }

  return (
    <div className="p-4">
      <h3 className="mb-4">All Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div>{order.address?.email}</div>
                    <small>{order.address?.phone}</small>
                  </td>

                  <td>
                    {order.items.map((item, i) => (
                      <div key={i}>
                        {item.name} × {item.quantity} ({item.size})
                      </div>
                    ))}
                  </td>

                  <td>₹{order.amount}</td>

                  <td>
                    {order.payment ? (
                      <span className="badge bg-success">Paid</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        {order.paymentMethod}
                      </span>
                    )}
                  </td>

                  <td>
                    <span className="badge bg-info">{order.status}</span>
                  </td>

                  <td>
                    <select
                      className="form-select"
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                    >
                      <option>Order Placed</option>
                      <option>Packed</option>
                      <option>Shipped</option>
                      <option>Out for Delivery</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;