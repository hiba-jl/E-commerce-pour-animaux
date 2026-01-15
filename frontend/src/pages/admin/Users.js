import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <div className="container">Chargement...</div>;

  return (
    <div className="container">
      <h1>Gestion des utilisateurs</h1>
      <p>Total: {users.length} utilisateurs</p>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Téléphone</th>
              <th>Inscription</th>
              <th>Adresse</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role role-${user.role}`}>
                    {user.role === 'admin' ? 'Admin' : 'Utilisateur'}
                  </span>
                </td>
                <td>{user.phone || 'N/A'}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  {user.address?.city ? `${user.address.city}, ${user.address.country}` : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;


