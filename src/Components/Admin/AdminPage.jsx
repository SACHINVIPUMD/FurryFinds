import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend as ChartLegend } from 'chart.js';
import './AdminPage.css';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, ChartLegend);

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [editStatus, setEditStatus] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [userRegistrations, setUserRegistrations] = useState([]);

  useEffect(() => {
    // Fetch orders
    axios.get('http://localhost:8080/api/orders')
      .then(response => {
        setOrders(response.data);
        // Process sales data for the bar chart
        const sales = response.data.reduce((acc, order) => {
          const month = new Date(order.createdAt).getMonth();
          acc[month] = (acc[month] || 0) + (order.productPrice * order.quantity);
          return acc;
        }, []);
        setSalesData(sales);
      })
      .catch(error => console.error('Error fetching orders:', error));

    // Fetch users
    axios.get('http://localhost:8080/api/auth/users')
      .then(response => {
        setUsers(response.data);
        // Process user registration data for the line chart
        const registrations = response.data.reduce((acc, user) => {
          const month = new Date(user.createdAt).getMonth();
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, []);
        setUserRegistrations(registrations);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleStatusChange = (orderId, status) => {
    setEditStatus(prevState => ({ ...prevState, [orderId]: status }));
  };

  const updateOrderStatus = (orderId) => {
    const status = editStatus[orderId];
    axios.put(`http://localhost:8080/api/orders/items/${orderId}/status`, null, {
      params: { status: status }
    })
    .then(response => {
      setOrders(prevOrders => prevOrders.map(order => 
        order.id === orderId ? { ...order, status: response.data.status } : order
      ));
      setEditStatus(prevState => ({ ...prevState, [orderId]: '' }));
      alert('Order status updated successfully!');
    })
    .catch(error => console.error('Error updating order status:', error));
  };
  

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:8080/api/auth/users/${userId}`)
        .then(() => {
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
          alert('User deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          // Remove the user from the UI even if the deletion fails due to a foreign key constraint
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
          alert('User could not be deleted from the database, but they have been removed from the display.');
        });
    }
  };

  // Data for Bar Chart (Monthly Sales)
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Sales',
      backgroundColor: 'rgba(75,192,192,0.6)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.8)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: salesData
    }]
  };

  // Data for Line Chart (User Registrations)
  const lineChartData = userRegistrations.map((count, index) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index],
    count: count || 0
  }));

  return (
    <div className="custom-admin-dashboard">
      <h1 className="custom-admin-title">Admin Dashboard</h1>
      
      <div className="custom-admin-section custom-orders-section">
        <h2>Manage Orders</h2>
        <table className="custom-admin-table custom-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>User Details</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.productName}</td>
                <td>{order.description}</td>
                <td>{order.productPrice}</td>
                <td>{order.quantity}</td>
                <td>{order.productPrice * order.quantity}</td>
                <td>{order.status}</td>
                <td>
                  <div>
                    <strong>Name:</strong> {order.user.name}<br />
                    <strong>Email:</strong> {order.user.email}<br />
                    <strong>Phone:</strong> {order.user.phno}<br />
                    <strong>Address:</strong> {order.user.address}
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    value={editStatus[order.id] || order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="custom-status-input"
                  />
                  <button 
                    className="custom-status-update-button"
                    onClick={() => updateOrderStatus(order.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="custom-admin-section custom-users-section">
        <h2>Manage Users</h2>
        <table className="custom-admin-table custom-users-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Delete</th>
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
                <td>
                  <button 
                    className="custom-delete-button"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="custom-admin-section custom-charts-section">
        <h2>Sales Analytics</h2>
        <div className="custom-charts-container">
          <div className="custom-chart-item">
            <h3>Monthly Sales</h3>
            <Bar data={barChartData} />
          </div>
          <div className="custom-chart-item">
            <h3>User Registrations</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
