import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders');
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <div className="container">Chargement...</div>;

  return (
    <div className="container">
      <h1>Mes commandes</h1>
      {orders.length === 0 ? (
        <p>Aucune commande</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>Commande #{order._id.slice(-8)}</h3>
                <span className={`status status-${order.status}`}>{order.status}</span>
              </div>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: {order.totalPrice.toFixed(2)} €</p>
              <p>Articles: {order.orderItems.length}</p>
              <Link to={`/orders/${order._id}`} className="btn btn-primary">
                Voir détails
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;


