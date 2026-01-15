import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      
      const res = await axios.get('/api/products', { params });
      setProducts(res.data);
      
      // Extract unique categories
      const cats = [...new Set(res.data.map(p => p.category))];
      setCategories(cats);
      
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Tous les produits</h1>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Toutes les catégories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : products.length === 0 ? (
        <p>Aucun produit trouvé</p>
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
                <p>{product.description.substring(0, 100)}...</p>
                <p className="price">{product.price.toFixed(2)} €</p>
                <p className="stock">Stock: {product.stock}</p>
                <Link to={`/products/${product._id}`} className="btn btn-primary">
                  Voir détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;


