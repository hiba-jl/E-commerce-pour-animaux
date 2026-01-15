import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        axios.get('/api/orders'),
        axios.get('/api/users'),
        axios.get('/api/products')
      ]);

      const orders = ordersRes.data;
      const revenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

      setStats({
        totalOrders: orders.length,
        totalUsers: usersRes.data.length,
        totalProducts: productsRes.data.length,
        totalRevenue: revenue
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <div className="container">Chargement...</div>;

  return (
    <div className="container">
      <h1>Tableau de bord Admin</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Commandes</h3>
          <p className="stat-number">{stats.totalOrders}</p>
          <Link to="/admin/orders">Voir toutes les commandes</Link>
        </div>
        
        <div className="stat-card">
          <h3>Utilisateurs</h3>
          <p className="stat-number">{stats.totalUsers}</p>
          <Link to="/admin/users">Voir tous les utilisateurs</Link>
        </div>
        
        <div className="stat-card">
          <h3>Produits</h3>
          <p className="stat-number">{stats.totalProducts}</p>
          <Link to="/admin/products">Gérer les produits</Link>
        </div>
        
        <div className="stat-card">
          <h3>Revenus totaux</h3>
          <p className="stat-number">{stats.totalRevenue.toFixed(2)} €</p>
        </div>
      </div>

      <div className="admin-links">
        <Link to="/admin/products" className="btn btn-primary">
          Gérer les produits
        </Link>
        <Link to="/admin/orders" className="btn btn-primary">
          Gérer les commandes
        </Link>
        <Link to="/admin/users" className="btn btn-primary">
          Gérer les utilisateurs
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;


