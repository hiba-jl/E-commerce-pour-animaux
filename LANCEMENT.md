# Guide de lancement rapide

## 📋 Prérequis

Avant de lancer l'application, assurez-vous d'avoir installé :
- **Node.js** (version 14 ou supérieure) : [Télécharger Node.js](https://nodejs.org/)
- **MongoDB** (local ou Atlas) : [Installer MongoDB](https://www.mongodb.com/try/download/community)

## 🚀 Étapes de lancement

### 1. Vérifier MongoDB

**Option A - MongoDB Local :**
```bash
# Vérifier que MongoDB est démarré
# Windows - Si MongoDB est installé comme service, il démarre automatiquement
# Sinon, dans un terminal séparé :
mongod
```

**Option B - MongoDB Atlas (Cloud) :**
- Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Obtenir votre chaîne de connexion
- Modifier `backend/.env` et remplacer `MONGODB_URI` par votre URL Atlas

### 2. Configuration du Backend

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances (première fois seulement)
npm install

# Vérifier que le fichier .env existe avec les bonnes valeurs
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/ecommerce
# JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-123456
```

### 3. Lancer le Backend

```bash
# Toujours dans le dossier backend
npm run dev
```

✅ Le backend devrait démarrer sur **http://localhost:5000**
✅ Vous devriez voir : "MongoDB Connected" et "Server running on port 5000"

### 4. Lancer le Frontend (dans un NOUVEAU terminal)

```bash
# Ouvrir un nouveau terminal
# Aller dans le dossier frontend
cd frontend

# Installer les dépendances (première fois seulement)
npm install

# Lancer le frontend
npm start
```

✅ Le frontend devrait démarrer sur **http://localhost:3000**
✅ Le navigateur s'ouvrira automatiquement

## 🎯 Accéder à l'application

- **Frontend (Interface utilisateur)** : http://localhost:3000
- **Backend API** : http://localhost:5000/api

## 👤 Première utilisation

1. **Créer un compte** : Cliquez sur "Inscription" et créez votre compte
2. **Créer un utilisateur admin** : Voir les instructions ci-dessous
3. **Se connecter** : Utilisez vos identifiants

### Créer un utilisateur Admin

Après avoir créé votre compte, ouvrez MongoDB et exécutez :

```javascript
// Dans MongoDB Compass ou mongo shell
use ecommerce
db.users.updateOne(
  { email: "votre-email@example.com" },
  { $set: { role: "admin" } }
)
```

Ou utilisez le script Node.js (si vous créez `backend/scripts/createAdmin.js` - voir SETUP.md)

Ensuite, déconnectez-vous et reconnectez-vous pour voir l'onglet "Admin".

## ⚠️ Dépannage

### Le backend ne démarre pas
- Vérifiez que le port 5000 n'est pas déjà utilisé
- Vérifiez que MongoDB est démarré
- Vérifiez que le fichier `backend/.env` existe

### Le frontend ne se connecte pas au backend
- Vérifiez que le backend tourne sur le port 5000
- Vérifiez le fichier `frontend/package.json` - le proxy doit être `"http://localhost:5000"`

### Erreur de connexion MongoDB
- Si MongoDB local : vérifiez que `mongod` est démarré
- Si MongoDB Atlas : vérifiez votre URL de connexion dans `.env`
- Vérifiez que votre IP est autorisée dans MongoDB Atlas (Settings > Network Access)

### Erreur "Module not found"
- Supprimez `node_modules` et `package-lock.json`
- Réinstallez : `npm install`

## 📝 Commandes utiles

```bash
# Backend - Mode développement (avec rechargement auto)
cd backend && npm run dev

# Backend - Mode production
cd backend && npm start

# Frontend - Mode développement
cd frontend && npm start

# Frontend - Build pour production
cd frontend && npm run build
```

## 🎉 C'est prêt !

Une fois les deux serveurs lancés, vous pouvez :
- Parcourir les produits
- Créer un compte et vous connecter
- Ajouter des produits au panier
- Passer une commande
- Accéder à l'interface admin (après promotion)



