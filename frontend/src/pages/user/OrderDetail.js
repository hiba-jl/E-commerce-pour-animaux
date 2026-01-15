import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`/api/orders/${id}`);
      setOrder(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <div className="container">Chargement...</div>;
  if (!order) return <div className="container">Commande non trouvée</div>;

  return (
    <div className="container">
      <Link to="/orders" className="back-link">← Retour aux commandes</Link>
      <h1>Commande #{order._id.slice(-8)}</h1>
      
      <div className="order-detail">
        <div className="order-info-section">
          <h2>Informations de commande</h2>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Statut:</strong> 
            <span className={`status status-${order.status}`}>{order.status}</span>
          </p>
          <p><strong>Méthode de paiement:</strong> {
            order.paymentMethod === 'livraison' ? '💳 À la livraison' :
            order.paymentMethod === 'sur_place' ? '🏪 Sur place' :
            '💳 Carte bancaire'
          }</p>
          <p><strong>Statut paiement:</strong> {order.isPaid ? '✅ Payé' : '⏳ Non payé'}</p>
          {order.isPaid && order.paidAt && (
            <p><strong>Date de paiement:</strong> {new Date(order.paidAt).toLocaleString()}</p>
          )}
        </div>

        <div className="order-items-section">
          <h2>Articles</h2>
          {order.orderItems.map((item, index) => (
            <div key={index} className="order-item-card">
              <div>
                <h3>{item.name}</h3>
                <p>Quantité: {item.quantity}</p>
                <p>Prix unitaire: {item.price.toFixed(2)} €</p>
              </div>
              <div className="item-total">
                {(item.price * item.quantity).toFixed(2)} €
              </div>
            </div>
          ))}
          <div className="order-total-section">
            <strong>Total: {order.totalPrice.toFixed(2)} €</strong>
          </div>
        </div>

        {order.shippingAddress && (
          <div className="shipping-section">
            <h2>Adresse de livraison</h2>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;


