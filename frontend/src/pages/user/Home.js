import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data.slice(0, 6));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <h1>Bienvenue dans notre boutique</h1>
          <p>Découvrez nos produits exceptionnels</p>
          <Link to="/products" className="btn btn-primary">Voir tous les produits</Link>
        </div>
      </div>

      <div className="container">
        <h2>Produits populaires</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="grid">
            {products.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="placeholder-image">Pas d'image</div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">{product.price.toFixed(2)} €</p>
                  <Link to={`/products/${product._id}`} className="btn btn-primary">
                    Voir détails
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


