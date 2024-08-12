import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [editStatus, setEditStatus] = useState({});

  useEffect(() => {
    // Fetch orders
    axios.get('http://localhost:8080/api/orders/2')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));

    // Fetch users
    axios.get('http://localhost:8080/api/auth/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleStatusChange = (orderId, status) => {
    setEditStatus(prevState => ({ ...prevState, [orderId]: status }));
  };

  const updateOrderStatus = (orderId) => {
    const status = editStatus[orderId];
    axios.put(`http://localhost:8080/api/orders/items/2/status?status=shipped`, { status })
      .then(response => {
        setOrders(prevOrders => prevOrders.map(order => 
          order.id === orderId ? { ...order, status: response.data.status } : order
        ));
        setEditStatus(prevState => ({ ...prevState, [orderId]: '' }));
        alert('Order status updated successfully!');
      })
      .catch(error => console.error('Error updating order status:', error));
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-section">
        <h2>Manage Orders</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>{order.status}</td>
                <td>
                  <input
                    type="text"
                    value={editStatus[order.id] || order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  />
                  <button onClick={() => updateOrderStatus(order.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-section">
        <h2>Manage Users</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.phno}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
