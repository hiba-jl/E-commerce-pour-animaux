import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
      country: ''
    }
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || {
          street: '',
          city: '',
          zipCode: '',
          country: ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/users/profile', formData);
      setMessage('Profil mis à jour avec succès');
    } catch (error) {
      setMessage('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="container">
      <h1>Mon profil</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Téléphone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <h3>Adresse</h3>
        <div className="form-group">
          <label>Rue</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ville</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Code postal</label>
          <input
            type="text"
            name="address.zipCode"
            value={formData.address.zipCode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Pays</label>
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
          />
        </div>

        {message && <p className="message">{message}</p>}
        
        <button type="submit" className="btn btn-primary">
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default Profile;


