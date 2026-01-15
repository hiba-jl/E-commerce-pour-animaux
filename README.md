# Application E-Commerce

Application e-commerce complète avec frontend React, backend Express.js et base de données MongoDB.

## Fonctionnalités

### Interface Utilisateur
- Parcourir les produits
- Rechercher et filtrer les produits par catégorie
- Voir les détails d'un produit
- Ajouter des produits au panier
- Passer une commande
- Gérer son profil
- Voir ses commandes

### Interface Admin
- Tableau de bord avec statistiques
- Gestion des produits (CRUD)
- Gestion des commandes (statuts, paiement)
- Visualisation des utilisateurs

## Technologies

### Backend
- Node.js / Express.js
- MongoDB / Mongoose
- JWT pour l'authentification
- bcryptjs pour le hachage des mots de passe

### Frontend
- React
- React Router
- Axios
- CSS

## Installation

### Prérequis
- Node.js (v14 ou supérieur)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

### Configuration Backend

1. Naviguer vers le dossier backend:
```bash
cd backend
```

2. Installer les dépendances:
```bash
npm install
```

3. Créer un fichier `.env` dans le dossier backend:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Démarrer le serveur backend:
```bash
npm run dev
```

Le backend sera accessible sur `http://localhost:5000`

### Configuration Frontend

1. Naviguer vers le dossier frontend:
```bash
cd frontend
```

2. Installer les dépendances:
```bash
npm install
```

3. Démarrer le serveur de développement:
```bash
npm start
```

Le frontend sera accessible sur `http://localhost:3000`

## Structure du projet

```
NosqlProject/
├── backend/
│   ├── models/          # Modèles Mongoose
│   ├── routes/          # Routes API
│   ├── middleware/      # Middleware (auth)
│   ├── server.js        # Point d'entrée
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/  # Composants React
│   │   ├── context/     # Context API
│   │   ├── pages/       # Pages de l'application
│   │   └── App.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Obtenir l'utilisateur actuel

### Produits
- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détails d'un produit
- `POST /api/products` - Créer un produit (admin)
- `PUT /api/products/:id` - Modifier un produit (admin)
- `DELETE /api/products/:id` - Supprimer un produit (admin)

### Commandes
- `POST /api/orders` - Créer une commande
- `GET /api/orders` - Liste des commandes
- `GET /api/orders/:id` - Détails d'une commande
- `PUT /api/orders/:id/pay` - Marquer comme payé
- `PUT /api/orders/:id/status` - Modifier le statut (admin)

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs (admin)
- `GET /api/users/:id` - Détails d'un utilisateur
- `PUT /api/users/profile` - Mettre à jour le profil

## Utilisation

1. **Créer un compte utilisateur** via l'interface d'inscription
2. **Parcourir les produits** et ajouter au panier
3. **Passer une commande** depuis le panier
4. **Pour accéder à l'interface admin**, vous devez créer un utilisateur avec le rôle admin dans MongoDB:
   ```javascript
   // Dans MongoDB, mettre à jour un utilisateur:
   db.users.updateOne(
     { email: "votre-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

## Notes

- Les mots de passe sont hachés avec bcryptjs
- L'authentification utilise JWT (Jetons valides 30 jours)
- Le panier est stocké dans le localStorage
- Les images de produits peuvent être des URLs externes

## Développement

Pour le développement, utilisez:
- Backend: `npm run dev` (avec nodemon pour le rechargement automatique)
- Frontend: `npm start` (avec rechargement automatique via React)

## Production

Pour la production:
- Backend: `npm start`
- Frontend: `npm run build` puis servez le dossier `build`


