import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NotificationBell.css';

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Vérifier toutes les 30 secondes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showDropdown) {
      fetchNotifications();
    }
  }, [showDropdown]);

  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get('/api/notifications/unread');
      setUnreadCount(res.data.count);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('/api/notifications');
      setNotifications(res.data.slice(0, 5)); // Afficher les 5 dernières
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`/api/notifications/${id}/read`);
      fetchUnreadCount();
      fetchNotifications();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put('/api/notifications/read-all');
      fetchUnreadCount();
      fetchNotifications();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <div className="notification-bell">
      <div 
        className="bell-icon" 
        onClick={() => setShowDropdown(!showDropdown)}
      >
        🔔
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </div>

      {showDropdown && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="mark-all-read">
                Tout marquer comme lu
              </button>
            )}
          </div>
          
          <div className="notification-list">
            {notifications.length === 0 ? (
              <p className="no-notifications">Aucune notification</p>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification._id}
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => {
                    markAsRead(notification._id);
                    if (notification.order) {
                      window.location.href = `/admin/orders`;
                    }
                  }}
                >
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">
                    {new Date(notification.createdAt).toLocaleString('fr-FR')}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="notification-footer">
            <Link to="/admin/orders" onClick={() => setShowDropdown(false)}>
              Voir toutes les commandes
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

