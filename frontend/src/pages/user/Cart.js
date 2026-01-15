import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('livraison');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const orderData = {
        orderItems: cartItems,
        paymentMethod: paymentMethod,
        shippingAddress: user.address || {}
      };

      const res = await axios.post('/api/orders', orderData);
      clearCart();
      
      // Afficher une notification de succès
      alert(`✅ Commande passée avec succès!\n\nTotal: ${cartTotal.toFixed(2)} €\nMéthode de paiement: ${paymentMethod === 'livraison' ? 'À la livraison' : paymentMethod === 'sur_place' ? 'Sur place' : 'Carte'}\n\nVotre commande a été enregistrée et vous sera livrée bientôt.`);
      
      navigate(`/orders/${res.data._id}`);
    } catch (error) {
      alert('Erreur lors de la commande: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <h1>Panier</h1>
        <p>Votre panier est vide</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Panier</h1>
      <div className="cart">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.product} className="cart-item">
              <div>
                <h3>{item.name}</h3>
                <p>{item.price.toFixed(2)} €</p>
              </div>
              <div className="cart-item-controls">
                <button onClick={() => updateQuantity(item.product, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product, item.quantity + 1)}>+</button>
                <button onClick={() => removeFromCart(item.product)} className="btn btn-danger">
                  Supprimer
                </button>
              </div>
              <div className="cart-item-total">
                {(item.price * item.quantity).toFixed(2)} €
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Résumé</h2>
          <p>Total: <strong>{cartTotal.toFixed(2)} €</strong></p>
          
          <div className="payment-method-section">
            <h3>Méthode de paiement</h3>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="livraison"
                  checked={paymentMethod === 'livraison'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💳 À la livraison</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="sur_place"
                  checked={paymentMethod === 'sur_place'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>🏪 Sur place (retrait)</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💳 Carte bancaire</span>
              </label>
            </div>
          </div>

          <button 
            onClick={handleCheckout} 
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? 'Traitement...' : 'Passer la commande'}
          </button>
          <button onClick={clearCart} className="btn btn-secondary">
            Vider le panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;


