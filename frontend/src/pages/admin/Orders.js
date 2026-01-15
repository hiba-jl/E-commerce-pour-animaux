import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status });
      fetchOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        const updated = await axios.get(`/api/orders/${orderId}`);
        setSelectedOrder(updated.data);
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handlePay = async (orderId) => {
    try {
      await axios.put(`/api/orders/${orderId}/pay`);
      fetchOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        const updated = await axios.get(`/api/orders/${orderId}`);
        setSelectedOrder(updated.data);
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour');
    }
  };

  if (loading) return <div className="container">Chargement...</div>;

  return (
    <div className="container">
      <h1>Gestion des commandes</h1>

      <div className="orders-container">
        <div className="orders-list">
          {orders.map(order => (
            <div
              key={order._id}
              className={`order-item ${selectedOrder?._id === order._id ? 'selected' : ''}`}
              onClick={() => setSelectedOrder(order)}
            >
              <div className="order-item-header">
                <h3>Commande #{order._id.slice(-8)}</h3>
                <span className={`status status-${order.status}`}>{order.status}</span>
              </div>
              <p>Client: {order.user?.name || 'N/A'}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: {order.totalPrice.toFixed(2)} €</p>
              <p>Paiement: {
                order.paymentMethod === 'livraison' ? 'À la livraison' :
                order.paymentMethod === 'sur_place' ? 'Sur place' :
                'Carte'
              }</p>
              <p>Articles: {order.orderItems.length}</p>
            </div>
          ))}
        </div>

        {selectedOrder && (
          <div className="order-details">
            <h2>Détails de la commande</h2>
            
            <div className="order-info">
              <p><strong>Commande #</strong> {selectedOrder._id.slice(-8)}</p>
              <p><strong>Client:</strong> {selectedOrder.user?.name}</p>
              <p><strong>Email:</strong> {selectedOrder.user?.email}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              <p><strong>Statut:</strong> 
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">En attente</option>
                  <option value="processing">En traitement</option>
                  <option value="shipped">Expédiée</option>
                  <option value="delivered">Livrée</option>
                  <option value="cancelled">Annulée</option>
                </select>
              </p>
              <p><strong>Méthode de paiement:</strong> {
                selectedOrder.paymentMethod === 'livraison' ? '💳 À la livraison' :
                selectedOrder.paymentMethod === 'sur_place' ? '🏪 Sur place' :
                '💳 Carte bancaire'
              }</p>
              <p><strong>Statut paiement:</strong> {selectedOrder.isPaid ? '✅ Payé' : '⏳ Non payé'}</p>
              {!selectedOrder.isPaid && (
                <button onClick={() => handlePay(selectedOrder._id)} className="btn btn-success">
                  Marquer comme payé
                </button>
              )}
            </div>

            <div className="order-items">
              <h3>Articles</h3>
              {selectedOrder.orderItems.map((item, index) => (
                <div key={index} className="order-item-detail">
                  <p><strong>{item.name}</strong></p>
                  <p>Quantité: {item.quantity}</p>
                  <p>Prix unitaire: {item.price.toFixed(2)} €</p>
                  <p>Sous-total: {(item.price * item.quantity).toFixed(2)} €</p>
                </div>
              ))}
              <div className="order-total">
                <strong>Total: {selectedOrder.totalPrice.toFixed(2)} €</strong>
              </div>
            </div>

            {selectedOrder.shippingAddress && (
              <div className="shipping-address">
                <h3>Adresse de livraison</h3>
                <p>{selectedOrder.shippingAddress.street}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.zipCode}</p>
                <p>{selectedOrder.shippingAddress.country}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;


