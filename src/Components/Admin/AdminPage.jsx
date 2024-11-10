import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend as ChartLegend } from 'chart.js';
import './AdminPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, ChartLegend);

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [editStatus, setEditStatus] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    stockQuantity: ''
  });

  useEffect(() => {
    // Fetch orders
    axios.get('http://localhost:8080/api/orders')
      .then(response => {
        setOrders(response.data);
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
        const registrations = response.data.reduce((acc, user) => {
          const month = new Date(user.createdAt).getMonth();
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, []);
        setUserRegistrations(registrations);
      })
      .catch(error => console.error('Error fetching users:', error));

    // Fetch products
    axios.get('http://localhost:8080/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
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
        });
    }
  };

  const handleProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    axios.post('http://localhost:8080/api/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', description: '', price: '', imageUrl: '', stockQuantity: '' });
        alert('Product added successfully!');
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://localhost:8080/api/products/${productId}`)
        .then(() => {
          setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
          alert('Product deleted successfully!');
        })
        .catch(error => console.error('Error deleting product:', error));
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
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <ul>
          <li><a href="#orders-section">Manage Orders</a></li>
          <li><a href="#users-section">Manage Users</a></li>
          <li><a href="#products-section">Manage Products</a></li>
          <li><a href="#charts-section">Sales Analytics</a></li>
        </ul>
      </div>

      <div className="admin-content">
        <h1 className="admin-title">Admin Dashboard</h1>
        
        <div id="orders-section" className="admin-section orders-section">
          <h2>Manage Orders</h2>
          <table className="admin-table orders-table">
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
                      className="status-input"
                    />
                    <button 
                      className="status-update-button"
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

        <div id="users-section" className="admin-section users-section">
          <h2>Manage Users</h2>
          <table className="admin-table users-table">
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
                      className="delete-button"
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

        <div id="products-section" className="admin-section products-section">
          <h2>Manage Products</h2>
          <div className="product-form">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleProductChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={handleProductChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={handleProductChange}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={newProduct.imageUrl}
              onChange={handleProductChange}
            />
            <input
              type="number"
              name="stockQuantity"
              placeholder="Stock Quantity"
              value={newProduct.stockQuantity}
              onChange={handleProductChange}
            />
            <button onClick={addProduct}>Add Product</button>
          </div>
          <table className="admin-table products-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>image</th>
                <th>Stock Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody> 
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.imageUrl}</td>
                  <td>{product.stockQuantity}</td>
                  <td>
                    <button 
                      className="delete-button"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div id="charts-section" className="admin-section charts-section">
          <h2>Sales Analytics</h2>
          <div className="custom-chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <Bar
                data={barChartData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </ResponsiveContainer>
          </div>

          <div className="custom-chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={lineChartData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
