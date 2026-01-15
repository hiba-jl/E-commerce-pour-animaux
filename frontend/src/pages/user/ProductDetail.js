import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert('Produit ajouté au panier!');
  };

  if (loading) return <div className="container">Chargement...</div>;
  if (!product) return <div className="container">Produit non trouvé</div>;

  return (
    <div className="container">
      <div className="product-detail">
        <div className="product-detail-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="placeholder-image">Pas d'image</div>
          )}
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="category">Catégorie: {product.category}</p>
          <p className="price">{product.price.toFixed(2)} €</p>
          <p className="description">{product.description}</p>
          <p className="stock">Stock disponible: {product.stock}</p>
          
          {product.stock > 0 ? (
            <>
              <div className="quantity-selector">
                <label>Quantité:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
              </div>
              <button onClick={handleAddToCart} className="btn btn-primary">
                Ajouter au panier
              </button>
            </>
          ) : (
            <p className="out-of-stock">Rupture de stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


